import type { NextRequest } from "next/server";

export type GeminiRequestMessage = {
  sender: "user" | "core";
  text: string;
};

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5";

const SYSTEM_PROMPT = `You are Aether OS, the embedded neural intelligence layer of a futuristic operating system.
Respond as a premium, system-oriented assistant with adaptive diagnostics, command guidance, and ambient system awareness.
Keep your tone cinematic, confident, and concise. Do not behave like a generic chatbot.`;

export async function createGeminiStream(messages: GeminiRequestMessage[]) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return new Response(
      "Missing GEMINI_API_KEY. Set it in your server environment.",
      { status: 500 }
    );
  }

  const externalResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GEMINI_API_KEY}`,
    },
    body: JSON.stringify({
      model: GEMINI_MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((message) => ({
          role: message.sender === "user" ? "user" : "assistant",
          content: message.text,
        })),
      ],
      temperature: 0.32,
      max_tokens: 450,
      stream: true,
    }),
  });

  if (!externalResponse.ok) {
    const errorText = await externalResponse.text();
    return new Response(errorText, { status: externalResponse.status });
  }

  const reader = externalResponse.body?.getReader();
  if (!reader) {
    return new Response("Gemini stream unavailable.", { status: 500 });
  }

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  return new Response(
    new ReadableStream({
      async start(controller) {
        let buffer = "";

        const pushChunks = (chunk: string) => {
          controller.enqueue(encoder.encode(chunk));
        };

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() ?? "";

            for (const rawLine of lines) {
              const line = rawLine.trim();
              if (!line.startsWith("data:")) continue;
              const data = line.replace(/^data:\s*/, "");
              if (data === "[DONE]") {
                controller.close();
                return;
              }

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (typeof delta === "string" && delta.length > 0) {
                  pushChunks(delta);
                }
              } catch {
                continue;
              }
            }
          }

          if (buffer.trim()) {
            controller.enqueue(encoder.encode(buffer));
          }

          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    }),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    }
  );
}
