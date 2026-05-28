import { GoogleGenerativeAI } from "@google/generative-ai";

type GeminiRequestMessage = {
  sender: "user" | "core";
  text: string;
};

const SYSTEM_INSTRUCTION = `You are Aether OS, the embedded neural intelligence layer of a futuristic operating system.
Respond as a premium system assistant with precise diagnostics, adaptive optimization guidance, and cinematic operating-system context.
Maintain an embedded OS voice rather than a generic chatbot tone.`;

export const createGeminiStream = async (messages: GeminiRequestMessage[]) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return new Response("Missing GEMINI_API_KEY. Please set it in the server environment.", {
      status: 500,
    });
  }

  const modelName = process.env.GEMINI_MODEL ?? "gemini-flash-latest";
  const aliasMap: Record<string, string> = {
    "gemini-1.5": "gemini-flash-latest",
    "gemini-1.5-flash": "gemini-flash-latest",
    "gemini-1.5-mini": "gemini-flash-latest",
  };
  const effectiveModel = aliasMap[modelName] ?? modelName;

  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({
    model: effectiveModel,
    systemInstruction: SYSTEM_INSTRUCTION,
  });

  const request = {
    contents: messages.map((message) => ({
      role: message.sender === "user" ? "user" : "model",
      parts: [{ text: message.text }],
    })),
    generationConfig: {
      maxOutputTokens: 520,
      temperature: 0.28,
      topP: 0.9,
      topK: 40,
    },
  };

  try {
    const result = await model.generateContent(request, { timeout: 120000 });
    const text = result.response?.text?.() ?? "";

    if (!text) {
      return new Response("Gemini returned an empty response.", { status: 500 });
    }

    return new Response(text, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Gemini request failed.";
    return new Response(`Gemini request failed: ${message}`, { status: 500 });
  }
};

export default createGeminiStream;
