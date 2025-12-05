importScripts("libs/google-genai.js");

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "CALL_GEMINI") {
    chrome.storage.local.get("gemini_api_key", async ({ gemini_api_key }) => {
      if (!gemini_api_key) {
        sendResponse({ error: "No API key" });
        return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey: gemini_api_key });

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: msg.prompt,
        });

        sendResponse({ text: response.text });
      } catch (e) {
        sendResponse({ error: e.message || String(e) });
      }
    });

    return true; // keep message channel open for async sendResponse
  }
});
