import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "메시지를 입력해주세요." }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "당신은 친절하고 전문적인 AI 어시스턴트입니다. 한국어로 답변하세요.",
        },
        { role: "user", content: message },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const reply = completion.choices[0]?.message?.content?.trim() || "답변을 생성할 수 없습니다.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("OpenAI API 오류:", error);

    return NextResponse.json(
      {
        error: error?.message || "알 수 없는 오류가 발생했습니다.",
      },
      { status: 500 }
    );
  }
}
