import { createGeminiStream } from "../../../lib/gemini";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const payload = await request.json();
  const messages = payload.messages;

  if (!Array.isArray(messages)) {
    return new Response("Invalid request payload", { status: 400 });
  }

  return createGeminiStream(messages);
}
