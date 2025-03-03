import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables
const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });

export async function POST(req) {
  try {
    const { text } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: `Translate the following text to English: "${text}"`,
        },
      ],
    });

    return NextResponse.json({ translation: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error translating text:", error);
    return NextResponse.json({ error: 'Failed to translate text.' }, { status: 500 });
  }
}
