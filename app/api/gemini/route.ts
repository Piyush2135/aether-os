import { createGeminiResponse } from "../../../lib/gemini";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const messages = Array.isArray(payload?.messages) ? payload.messages : null;

    if (!messages) {
      return new Response("Invalid request payload", { status: 400 });
    }

    return await createGeminiResponse(messages);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid request payload.";
    console.error("[/api/gemini] request error:", message, error);
    return new Response(`Gemini route processing failed: ${message}`, {
      status: 400,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
