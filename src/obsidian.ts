import { App } from "obsidian";
import { getISOWeekNumber, getWeekRange } from "./date-utils";

function getDailyNotesFolder(app: App): string {
  // @ts-ignore (Obsidian internal API)
  return app.internalPlugins.plugins["daily-notes"]?.instance?.options?.folder || "";
}

async function getWeeklyDailyNotes(app: App) {
  const dailyFolder = getDailyNotesFolder(app);
  if (!dailyFolder) return [];

  const { monday, friday } = getWeekRange();

  return app.vault.getMarkdownFiles().filter(file => {
    if (!file.path.startsWith(dailyFolder)) return false;

    const dateMatch = file.basename.match(/\d{4}-\d{2}-\d{2}/);
    if (!dateMatch) return false;

    const fileDate = new Date(dateMatch[0]);
    return fileDate >= monday && fileDate <= friday;
  });
}

interface TaskBuckets {
  done: string[];
  pending: string[];
}

function extractTasks(content: string): TaskBuckets {
  const done: string[] = [];
  const pending: string[] = [];

  const lines = content.split("\n");
  for (const line of lines) {
    const match = line.match(/^- \[( |x)\] (.+)/);
    if (!match) continue;

    const [, state, text] = match;
    if (state === "x") done.push(text);
    else pending.push(text);
  }

  return { done, pending };
}

async function collectWeeklyTasks(app: App): Promise<TaskBuckets> {
  const files = await getWeeklyDailyNotes(app);

  const done: string[] = [];
  const pending: string[] = [];

  for (const file of files) {
    const content = await app.vault.read(file);
    const tasks = extractTasks(content);
    done.push(...tasks.done);
    pending.push(...tasks.pending);
  }

  return { done, pending };
}

async function writeWeeklyNote(app: App, content: string) {
  const weekId = getISOWeekNumber(new Date());
  const path = `Weekly/Week-${weekId}.md`;

  const markdown = `# Weekly Review – Week ${weekId}

${content}
`;

  await app.vault.create(path, markdown);
}

export { collectWeeklyTasks, writeWeeklyNote };
