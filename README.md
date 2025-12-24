# Prompt Optimizer (Chrome Extension)

Prompt Optimizer is a Chrome extension that improves prompts written on ChatGPT, Gemini, and Claude. It detects the active prompt input, rewrites it using simple prompt-engineering rules or Gemini, and replaces it directly in the same field.

## Features

-   One-click prompt optimization

-   Supports ChatGPT, Claude, and Gemini

-   Local rule-based optimizer (works without API key)

-   Optional Gemini API integration

-   Automatically detects prompt input fields

-   Rewrites prompts in place

## Project Structure

```
prompt-optimizer/
├── manifest.json
├── popup.html
├── popup.js
├── styles.css
├── content.js
├── background.js
└── libs/
    └── google-genai.js
```

## Installation

1.  Clone the repository

    `
    git clone https://github.com/praveen4107/prompt-optimizer-chrome.git
    `

3.  Open chrome://extensions

4.  Enable Developer Mode

5.  Click Load unpacked and select the project folder

## API Setup

-   Generate a Gemini API key from Google AI Studio

-   Paste the key in the extension popup

## Usage

1.  Open ChatGPT, Claude, or Gemini

2.  Type a prompt

3.  Click the extension icon and optimize

## Privacy

-   API key is stored locally in Chrome

-   Prompts are sent to Gemini only if an API key is provided

-   No data collection
