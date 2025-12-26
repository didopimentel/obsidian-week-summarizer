import { App, PluginSettingTab, Setting } from "obsidian";
import type WeeklyAIReview from "./main";

export interface WeeklyAIReviewSettings {
  openAIApiKey: string;
}

export const DEFAULT_SETTINGS: WeeklyAIReviewSettings = {
  openAIApiKey: ""
};

export class WeeklyAIReviewSettingTab extends PluginSettingTab {
  plugin: WeeklyAIReview;

  constructor(app: App, plugin: WeeklyAIReview) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("OpenAI API key")
      .setDesc("Used to generate weekly summaries")
      .addText(text =>
        text
          .setPlaceholder("sk-...")
          .setValue(this.plugin.settings.openAIApiKey)
          .onChange(async (value) => {
            this.plugin.settings.openAIApiKey = value.trim();
            await this.plugin.saveSettings();
          })
      );
  }
}