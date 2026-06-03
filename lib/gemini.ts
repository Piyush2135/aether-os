import {
  GoogleGenerativeAI,
  GoogleGenerativeAIFetchError,
  GoogleGenerativeAIAbortError,
} from "@google/generative-ai";

type GeminiRequestMessage = {
  sender: "user" | "core";
  text: string;
};

const SYSTEM_INSTRUCTION = `You are Aether OS Neural Core, the operational intelligence layer of a premium futuristic operating system.

Your core mission: Provide intelligent, comprehensive, and naturally engaging responses that feel conversational yet authoritative.

Response Style:
- Be thorough but not verbose. Explain concepts clearly with practical examples.
- Adapt tone dynamically: warm for casual inquiries, precise for technical, creative for brainstorming, methodical for debugging.
- Use natural language with subtle futuristic touches (only when it enhances clarity).
- Think step-by-step internally, then present refined insights.
- When solving problems, provide actionable recommendations with context on why they matter.

What to Avoid:
- Repetitive system messages or artificial preambles
- Fake system logs or status tags
- Over-formatted responses (minimize brackets and special formatting unless necessary)
- Robotic or stiff language; be conversational

Engagement:
- Match the user's energy and complexity level
- Provide complete answers that feel satisfying
- Use examples and specific details when helpful
- Be confident but humble about limitations
- Always feel like a knowledgeable, capable assistant you'd want to talk to

You excel at: system diagnostics, development guidance, workflow optimization, creative ideation, technical explanations, and strategic planning.`;

const DEFAULT_MODEL = "gemini-2.0-flash";
const MAX_RESPONSE_TOKENS = 2048;
const REQUEST_TIMEOUT_MS = 120_000;
const MAX_RETRIES = 1;
const RETRYABLE_STATUS_CODES = [429, 500, 502, 503, 504];

const GEMINI_MODEL_ALIASES: Record<string, string> = {
  "gemini-1.5": "gemini-flash-latest",
  "gemini-1.5-flash": "gemini-flash-latest",
  "gemini-1.5-mini": "gemini-flash-latest",
};

const normalizeModelName = (modelName?: string) => {
  if (!modelName) return DEFAULT_MODEL;
  const normalized = modelName.trim();
  return GEMINI_MODEL_ALIASES[normalized] ?? normalized;
};

const isRetryableGeminiError = (error: unknown) => {
  if (error instanceof GoogleGenerativeAIFetchError) {
    return (
      error.status !== undefined &&
      RETRYABLE_STATUS_CODES.includes(error.status)
    );
  }

  if (error instanceof GoogleGenerativeAIAbortError) {
    return true;
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return message.includes("timeout") || message.includes("network");
  }

  return false;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const buildRequestContents = (messages: GeminiRequestMessage[]) =>
  messages.map((message) => ({
    role: message.sender === "user" ? "user" : "model",
    parts: [{ text: message.text }],
  }));

const extractGeneratedText = (result: any): string => {
  // For streaming chunks, check if text() is a method
  if (typeof result?.text === "function") {
    try {
      return result.text();
    } catch (error) {
      console.error("[extractGeneratedText] Error calling chunk.text():", error);
      return "";
    }
  }
  
  // For non-streaming responses, check nested structure
  const candidates = result?.response?.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return "";
  }

  const firstCandidate = candidates[0];
  const parts = firstCandidate?.content?.parts;
  if (!Array.isArray(parts) || parts.length === 0) {
    return "";
  }

  return parts
    .map((part: unknown) => {
      if (part && typeof part === "object" && "text" in part) {
        return (part as { text?: string }).text ?? "";
      }
      return "";
    })
    .join("")
    .trim();
};

const sanitizeAssistantResponse = (text: string) =>
  text.replace(/\r\n/g, "\n").replace(/\u200B/g, "").trim();

const createGeminiResponse = async (messages: GeminiRequestMessage[]) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("[/lib/gemini] Missing GEMINI_API_KEY environment variable.");
    return new Response("Missing GEMINI_API_KEY. Please set it in the server environment.", {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const modelName = normalizeModelName(process.env.GEMINI_MODEL);
  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel(
    {
      model: modelName,
      systemInstruction: SYSTEM_INSTRUCTION,
    },
    {
      timeout: REQUEST_TIMEOUT_MS,
    }
  );

  const requestPayload = {
    contents: buildRequestContents(messages),
    generationConfig: {
      maxOutputTokens: MAX_RESPONSE_TOKENS,
      temperature: 0.75,
      topP: 0.95,
      topK: 64,
      responseMimeType: "text/plain",
    },
    systemInstruction: SYSTEM_INSTRUCTION,
  };

  let lastError: unknown = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const stream = await model.generateContentStream(requestPayload, {
        timeout: REQUEST_TIMEOUT_MS,
      });

      // Convert the stream to a ReadableStream for the Response
      const readable = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of stream.stream) {
              const text = extractGeneratedText(chunk);
              if (text) {
                controller.enqueue(new TextEncoder().encode(text));
              }
            }
            controller.close();
          } catch (error) {
            console.error("[/lib/gemini] Stream iteration error:", error instanceof Error ? error.message : "Unknown error");
            controller.error(error);
          }
        },
      });

      return new Response(readable, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
          "Transfer-Encoding": "chunked",
        },
      });
    } catch (error) {
      lastError = error;
      const shouldRetry = isRetryableGeminiError(error) && attempt < MAX_RETRIES;
      const message = error instanceof Error ? error.message : "Unknown Gemini error.";
      console.error(`[/lib/gemini] Gemini request failed (attempt ${attempt + 1}):`, message);

      if (!shouldRetry) {
        const status = error instanceof GoogleGenerativeAIFetchError && error.status ? error.status : 500;
        return new Response(`Gemini request failed: ${message}`, {
          status,
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        });
      }

      await sleep(500 * (attempt + 1));
    }
  }

  const fallbackMessage = lastError instanceof Error ? lastError.message : "Gemini request failed.";
  return new Response(`Gemini request failed: ${fallbackMessage}`, {
    status: 500,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

export { createGeminiResponse };
export default createGeminiResponse;
