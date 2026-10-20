export function getOpenAIConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  return { apiKey, model };
}

export function validateOpenAIConfig() {
  const { apiKey, model } = getOpenAIConfig();
  const issues = [];

  if (!apiKey) {
    issues.push("OPENAI_API_KEY is missing. Set it in .env.local or Vercel environment variables.");
  }

  if (!model) {
    issues.push("OPENAI_MODEL is empty.");
  }

  return {
    ok: issues.length === 0,
    issues,
    apiKey: apiKey || "",
    model: model || "",
  };
}
