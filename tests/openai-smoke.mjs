import OpenAI from "openai";
import { getOpenAIConfig, validateOpenAIConfig } from "../../lib/openai-config.js";

const { apiKey, model } = getOpenAIConfig();

if (!apiKey) {
  throw new Error("OPENAI_API_KEY가 없습니다. .env.local 또는 배포 환경 변수를 확인하세요.");
}

const client = new OpenAI({ apiKey });

const result = await client.chat.completions.create({
  model: model || "gpt-4o-mini",
  messages: [{ role: "user", content: "반갑습니다. 환경 설정이 정상인지 확인해 주세요." }],
  max_tokens: 32,
});

console.log("OpenAI 응답 확인: