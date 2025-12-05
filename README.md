# 📦 Prompt Optimizer (Chrome Extension)

Prompt Optimizer is a Chrome extension that automatically improves your prompts on ChatGPT, Gemini, and Claude. It detects the prompt on the page, refines it using prompt-engineering best practices, and replaces it with a clearer, more effective version — instantly.

**🚀 Features**

- One-click prompt optimization
- Works on ChatGPT, Claude, and Gemini
- Uses Google Gemini (Free tier) where available, with a local fallback optimizer
- Auto-detects prompt fields (`textarea`, `div[role="textbox"]`, `contenteditable`)
- Replaces the original prompt with an optimized version in-place
- Simple, modern UI
- Secure API key storage using Chrome `storage.sync`

**📁 Folder Structure**

```
prompt-optimizer/
│
├── manifest.json
├── popup.html
├── popup.js
├── styles.css
├── content.js
├── background.js
└── libs/
	└── google-genai.js
```

**🔧 Installation (Developer Mode)**

1. Clone or download this repository:

```bash
git clone https://github.com/praveen4107/prompt-optimizer-chrome.git
```

2. Open `chrome://extensions` in Chrome or a Chromium-based browser
3. Enable **Developer mode** (toggle in the top-right)
4. Click **Load unpacked** and select the `prompt-optimizer` folder
5. The extension will appear in your toolbar

**🛠 Initial Setup (API Key)**

1. Go to Google AI Studio: https://aistudio.google.com
2. Generate a free API key (Gemini free tier) if you want remote rewriting
3. Open the extension popup
4. Paste the API key and click **Save API Key**

> The extension also includes a local (free) rule-based optimizer that will work without an API key. Use the remote Gemini API if you want LLM-quality rewrites and you have a supported model.

**✨ How to Use**

1. Open ChatGPT, Claude, or Gemini in a tab
2. Type your prompt in the chat input as you normally would
3. Click the extension icon, then click **Optimize Prompt (active tab)**
4. The prompt will be rewritten in-place using the chosen optimizer

**🤖 Technology Used**

- Manifest V3 (Chrome Extensions)
- Gemini Free API
- Custom lightweight client (google-genai.js)
- Vanilla JS (no frameworks)
- Secure chrome.storage.local for API key handling

**🧩 How It Works**

1. Detect Prompt: `content.js` scans the active site for common prompt fields (`textarea`, `div[role="textbox"]`, `div[contenteditable="true"]`, `input`), including inside shadow DOMs for better coverage.
2. Optimize: By default the extension uses a local rule-based optimizer. If configured with an API key and a supported model, it can call Gemini to perform LLM-based rewrites.
3. Replace Prompt: The optimized text is injected back into the same field and input events are dispatched so the host app recognizes the change.

**🔐 Privacy & Security**

- Your API key is stored locally in Chrome only (using `chrome.storage.sync`).
- Prompt text is only sent to Google Gemini if you explicitly provide an API key and the extension calls the remote API.
- The extension does not collect or transmit usage data elsewhere.