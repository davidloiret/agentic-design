TS
/**
 * Sequential Chaining in TypeScript (no frameworks)
 * 
 * Flow:
 * 1) Decompose a complex goal into minimal substeps (JSON).
 * 2) Turn substeps into an actionable plan (JSON).
 * 3) Execute each plan item; collect deliverables.
 * 4) Synthesize into a final, polished answer.
 * 
 * Notes:
 * - Uses fetch to call an OpenAI-style Chat Completions API.
 * - If OPENAI_API_KEY is absent, runs in a stub mode to demonstrate chaining.
 * - Requires Node 18+ (built-in fetch). Compile with tsc or run with ts-node.
 */

import { setTimeout as sleep } from "timers/promises";

// -----------------------------
// Config
// -----------------------------
const OPENAI_API_KEY = "sk-svcacct-u84l6M1t2Ylb7oEZAc7QIRdDdDcOsyfSh0gs4jgP3qadhifA2SCQa4jn4gkmWT3BlbkFJihtAQmKwbpKBacyJbNkdVU0KeEuT2sm6MM3Bs8H1i3_BL-pH9_jJ4JtiMqWGwA";
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-4.1-nano";

// -----------------------------
// Types
// -----------------------------
type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

interface ChatResponse {
  choices: Array<{
    message: { content: string };
  }>;
}

type PlanItem = {
  step: string;
  objective: string;
  method: string | string[];
  deliverable: string;
};

type ExecResult = {
  step: string;
  deliverable: string;
  result: string;
};

type ChainBundle = {
  goal: string;
  substeps: string[];
  plan: PlanItem[];
  exec_results: ExecResult[];
  final_answer: string;
};

// -----------------------------
// Low-level LLM caller
// -----------------------------
async function callLLM(system: string, user: string, temperature = 0.2): Promise<string> {
  if (!OPENAI_API_KEY) {
    // Stub mode to show the flow without making requests
    await sleep(50);
    return `[STUB OUTPUT] ${user.slice(0, 280)}`;
  }

  const payload = {
    model: MODEL,
    temperature,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ] as ChatMessage[],
  };

  const res = await fetch(OPENAI_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`LLM HTTP ${res.status}: ${text}`);
  }

  const data = (await res.json()) as ChatResponse;
  const content = data.choices?.[0]?.message?.content?.trim();
  if (!content) throw new Error("Empty LLM response content.");
  return content;
}

// -----------------------------
// Utilities
// -----------------------------
function extractJSON<T = any>(text: string): T {
  // Try fenced ```json blocks first
  const fenced = /```json\s*([\s\S]*?)\s*```/i.exec(text);
  const candidate = fenced ? fenced[1].trim() : text.trim();

  try {
    return JSON.parse(candidate) as T;
  } catch {
    // Fallback: find first {...} or [...]
    const match = /(\{[\s\S]*\}|\[[\s\S]*\])/.exec(candidate);
    if (match) {
      return JSON.parse(match[1]) as T;
    }
    throw new Error(`Could not parse JSON from: ${text.slice(0, 500)}...`);
  }
}

// -----------------------------
// Chained steps
// -----------------------------
async function stepDecompose(goal: string): Promise<string[]> {
  const system = "You are a precise planner. Output valid JSON only when asked.";
  const prompt = `Decompose the following goal into 3-6 minimal, dependency-ordered substeps.
Return ONLY JSON: an array of short strings.

Goal:
${goal}
`;
  const out = await callLLM(system, prompt);
  return extractJSON<string[]>(out);
}

async function stepPlan(goal: string, substeps: string[]): Promise<PlanItem[]> {
  const system = "You are an operations-minded assistant. Output valid JSON.";
  const prompt = `Create an actionable plan for this goal and substeps.

Goal: ${goal}

Substeps (JSON):
${JSON.stringify(substeps, null, 2)}

Return ONLY JSON: an array where each item has:
- step (string: the substep)
- objective (1 sentence)
- method (2-4 concise bullets or short array)
- deliverable (what artifact/result will be produced)
`;
  const out = await callLLM(system, prompt);
  return extractJSON<PlanItem[]>(out);
}

async function stepExecute(goal: string, plan: PlanItem[]): Promise<ExecResult[]> {
  const results: ExecResult[] = [];
  for (let i = 0; i < plan.length; i++) {
    const item = plan[i];
    const system = "You are an expert executor. Be specific and concise.";
    const execPrompt = `You are executing item ${i + 1} of a plan toward the goal.

Goal:
${goal}

Plan item (JSON):
${JSON.stringify(item)}

Instructions:
- Produce the 'deliverable' described above.
- Keep it compact but complete.
- If a list/table is appropriate, format it in Markdown.

Return just the deliverable content (no extra commentary).
`;
    const deliverable = await callLLM(system, execPrompt);
    results.push({ step: item.step, deliverable: item.deliverable, result: deliverable });
  }
  return results;
}

async function stepSynthesize(goal: string, execResults: ExecResult[]): Promise<string> {
  const system = "You are a meticulous editor. Produce a cohesive, well-structured final answer.";
  const prompt = `Synthesize the following partial results into a single, polished output
that fully satisfies the goal. Remove redundancies, fix inconsistencies, and ensure
clear structure with helpful headings. Use Markdown.

Goal:
${goal}

Partial results (JSON):
${JSON.stringify(execResults)}
`;
  return callLLM(system, prompt, 0.3);
}

// -----------------------------
// Runner (the chain)
// -----------------------------
export async function runChain(userGoal: string): Promise<ChainBundle> {
  const substeps = await stepDecompose(userGoal);
  const plan = await stepPlan(userGoal, substeps);
  const exec_results = await stepExecute(userGoal, plan);
  const final_answer = await stepSynthesize(userGoal, exec_results);
  return { goal: userGoal, substeps, plan, exec_results, final_answer };
}

// -----------------------------
// Example usage
// -----------------------------
if (require.main === module) {
  (async () => {
    const goal =
      "Create a 4-week study plan to learn core Linear Algebra for a busy professional " +
      "(~7 hours/week). Include weekly objectives, resources, and a short quiz each week " +
      "to self-check understanding. End with a compact formula/identity cheat sheet.";

    try {
      const bundle = await runChain(goal);

      console.log("\n=== FINAL ANSWER ===\n");
      console.log(bundle.final_answer);

      console.log("\n=== DEBUG: SUBSTEPS ===");
      console.log(JSON.stringify(bundle.substeps, null, 2));

      console.log("\n=== DEBUG: PLAN ===");
      console.log(JSON.stringify(bundle.plan, null, 2));

      console.log("\n=== DEBUG: EXECUTION RESULTS (TRUNCATED) ===");
      for (const r of bundle.exec_results) {
        const preview = r.result.length > 400 ? r.result.slice(0, 400) + "..." : r.result;
        console.log(`\n- ${r.step} → ${r.deliverable}\n${preview}`);
      }
    } catch (err) {
      console.error("Chain failed:", err);
      process.exitCode = 1;
    }
  })();
}

