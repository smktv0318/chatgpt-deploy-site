import fs from "node:fs";
import path from "node:path";
import OpenAI from "openai";

function loadDotEnv(filePath) {
  if (!fs.existsSync(filePath)) {
    return;
  }

  const content = fs.readFileSync(filePath, "utf8");
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) {
      continue;
    }

    const [key, ...rest] = trimmed.split("=");
    const value = rest.join("=").trim();
    if (!process.env[key]) {
      process.env[key] = value.replace(/^['"]|['"]$/g, "");
    }
  }
}

loadDotEnv(path.resolve(process.cwd(), ".env.local"));

const { apiKey, model } = process.env;

async function runCheck() {
  if (!apiKey) {
    console.error("OPENAI_API_KEY is missing. Add it to .env.local or your deployment environment.");
    process.exit(1);
  }

  try {
    const client = new OpenAI({ apiKey });
    const result = await client.models.list();

    console.log("OpenAI API connection: OK");
    console.log("Available models:", result.data?.length ?? 0);
    console.log("Configured model:", model || "gpt-4o-mini");
  } catch (error) {
    console.error("OpenAI API connection failed.");
    console.error(error?.message || error);
    process.exit(1);
  }
}

runCheck();
