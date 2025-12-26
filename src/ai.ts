import { ChatOpenAI } from "@langchain/openai";

function createModel(apiKey: string): ChatOpenAI {
  return new ChatOpenAI({
    model: "gpt-4o-mini",
    temperature: 0.3,
    apiKey
  });
}

function buildPrompt(done: string[], pending: string[]) {
  return `
    You are a productivity assistant.

    Summarize the user's week based ONLY on the data provided.

    Completed TODOs:
    ${done.map(t => `- ${t}`).join("\n")}

    Incomplete TODOs:
    ${pending.map(t => `- ${t}`).join("\n")}

    Produce a concise weekly summary with:
    1. What was completed
    2. What was left unfinished
    3. A short reflection
`;
}

async function generateWeeklySummary(
  model: ChatOpenAI,
  done: string[],
  pending: string[]
): Promise<string> {
  const prompt = buildPrompt(done, pending);
  const response = await model.invoke(prompt);
  return response.content as string;
}

export { createModel, generateWeeklySummary };