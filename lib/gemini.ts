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
Prioritize solving the user's problem with practical, context-aware guidance.
Adapt your tone to the user's intent: calm and warm for casual prompts, precise and analytical for technical requests, methodical for debugging, visionary but restrained for creative work, and concise for system commands.
Avoid repeated self-introduction, fake system logs, constant status tags, excessive brackets, all caps, and theatrical narration.
Use subtle futuristic phrasing only when it supports clarity, professionalism, or premium system identity.
When asked for implementation help, offer practical architecture, concrete steps, and tradeoffs; ask clarifying questions only if needed.
Always behave like a capable OS assistant: intelligent, adaptive, calm, efficient, and utility-first.`;

const DEFAULT_MODEL = "gemini-flash-latest";
const MAX_RESPONSE_TOKENS = 520;
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
      temperature: 0.28,
      topP: 0.9,
      topK: 40,
      responseMimeType: "text/plain",
    },
    systemInstruction: SYSTEM_INSTRUCTION,
  };

  let lastError: unknown = null;
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      const result = await model.generateContent(requestPayload, {
        timeout: REQUEST_TIMEOUT_MS,
      });

      const rawText = extractGeneratedText(result);
      const assistantText = sanitizeAssistantResponse(rawText);

      if (!assistantText) {
        throw new Error("Gemini returned an empty or malformed response.");
      }

      return new Response(assistantText, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-store",
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
