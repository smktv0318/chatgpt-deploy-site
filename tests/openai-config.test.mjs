import test from "node:test";
import assert from "node:assert/strict";

import { validateOpenAIConfig } from "../lib/openai-config.js";

test("validateOpenAIConfig should fail when API key is missing", () => {
  const previousKey = process.env.OPENAI_API_KEY;
  delete process.env.OPENAI_API_KEY;

  try {
    const result = validateOpenAIConfig();
    assert.equal(result.ok, false);
    assert.match(result.issues.join(" "), /OPENAI_API_KEY is missing/i);
  } finally {
    if (previousKey) {
      process.env.OPENAI_API_KEY = previousKey;
    }
  }
});

test("validateOpenAIConfig should use default model if not explicitly set", () => {
  const previousKey = process.env.OPENAI_API_KEY;
  const previousModel = process.env.OPENAI_MODEL;
  process.env.OPENAI_API_KEY = "test-key";
  delete process.env.OPENAI_MODEL;

  try {
    const result = validateOpenAIConfig();
    assert.equal(result.ok, true);
    assert.equal(result.model, "gpt-4o-mini");
  } finally {
    if (previousKey) {
      process.env.OPENAI_API_KEY = previousKey;
    } else {
      delete process.env.OPENAI_API_KEY;
    }

    if (previousModel) {
      process.env.OPENAI_MODEL = previousModel;
    } else {
      delete process.env.OPENAI_MODEL;
    }
  }
});
