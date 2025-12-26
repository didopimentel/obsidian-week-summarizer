# Weekly AI Review (Obsidian Plugin)

An Obsidian community plugin that uses AI to **summarize your week** by analyzing your **Daily Notes TODOs**.

It scans your daily notes from **Monday to Friday**, identifies:
- ✅ Completed TODOs
- ⏳ Incomplete TODOs  

…and generates a **weekly summary note** using OpenAI.

---

## ✨ Features

- 📅 Automatically collects Daily Notes from the current week (Mon → Fri)
- ✅ Extracts completed tasks (`- [x]`)
- ⏳ Extracts incomplete tasks (`- [ ]`)
- 🧠 Uses AI to summarize what you accomplished and what’s left
- 📝 Writes a clean weekly review note to your vault
- ⚙️ Configurable via Obsidian settings (no hardcoded API keys)

---

## 📦 Requirements

- Obsidian **Desktop** (macOS / Windows / Linux)
- Daily Notes **core plugin enabled**
- An OpenAI API key

> ⚠️ Local development is not supported on Obsidian Mobile.

---

## 🚀 Installation (Local / Development)

1. Clone or download this repository
2. Install dependencies and build the plugin:
   ```bash
   npm install
   npm run build
