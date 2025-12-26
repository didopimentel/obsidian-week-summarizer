import { Notice, Plugin } from "obsidian";
import { collectWeeklyTasks, writeWeeklyNote } from "./obsidian";
import { generateWeeklySummary, createModel } from "./ai";
import { DEFAULT_SETTINGS, WeeklyAIReviewSettings, WeeklyAIReviewSettingTab } from "./settings";

export default class WeeklyAIReview extends Plugin {
  settings!: WeeklyAIReviewSettings;

  async onload() {
    await this.loadSettings();
    
    this.addSettingTab(new WeeklyAIReviewSettingTab(this.app, this));

    this.addCommand({
      id: "generate-weekly-ai-summary",
      name: "Generate Weekly AI Summary",
      callback: async () => {
        if (!this.settings.openAIApiKey) {
            new Notice("Please set your OpenAI API key in plugin settings.");
            return;
        }
        new Notice("Weekly AI Summary started");
        const { done, pending } = await collectWeeklyTasks(this.app);
        const model = createModel(this.settings.openAIApiKey);
        const summary = await generateWeeklySummary(model, done, pending);
        await writeWeeklyNote(this.app, summary);
      }
    });
  }

  async loadSettings() {
    this.settings = Object.assign(
      {},
      DEFAULT_SETTINGS,
      await this.loadData()
    );
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }
}