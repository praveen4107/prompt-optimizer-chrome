// libs/google-genai.js
// Minimal browser-friendly implementation of GoogleGenAI for Chrome extensions.
// Usage:
//   const ai = new GoogleGenAI({ apiKey: "YOUR_KEY" });
//   const res = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents: "Explain how AI works in a few words",
//   });
//   console.log(res.text);

(function (global) {
  "use strict";

  const GEMINI_ENDPOINT_BASE =
    "https://generativelanguage.googleapis.com/v1beta/models";

  /**
   * Helper: build a basic text-only payload from a string or a richer object.
   */
  function buildPayload(contents) {
    // If it's already a structured contents array, just pass through.
    if (Array.isArray(contents)) {
      return { contents };
    }

    // If it's an object with a contents field, also pass through.
    if (
      contents &&
      typeof contents === "object" &&
      Array.isArray(contents.contents)
    ) {
      return { contents: contents.contents };
    }

    // Otherwise assume it's a simple string prompt.
    return {
      contents: [
        {
          parts: [
            {
              text: String(contents),
            },
          ],
        },
      ],
    };
  }

  /**
   * Helper: extract plain text from Gemini generateContent JSON response.
   */
  function extractTextFromResponse(json) {
    try {
      if (!json || !json.candidates || !json.candidates.length) return "";
      const candidate = json.candidates[0];
      if (
        candidate.content &&
        Array.isArray(candidate.content.parts) &&
        candidate.content.parts.length
      ) {
        return candidate.content.parts
          .map((p) => (p && p.text ? p.text : ""))
          .join("");
      }
      return "";
    } catch (e) {
      return "";
    }
  }

  class GoogleGenAI {
    constructor(options = {}) {
      this.apiKey = options.apiKey || null;

      if (!this.apiKey) {
        // In the official SDK, it tries env vars. In a browser/extension
        // we *expect* the API key to be passed explicitly.
        console.warn(
          "[GoogleGenAI] No apiKey provided. Requests will fail unless you set it."
        );
      }

      // Models helper mimicking ai.models.generateContent(...)
      this.models = {
        generateContent: async ({ model, contents }) => {
          if (!model) {
            throw new Error("model is required for generateContent");
          }
          if (!this.apiKey) {
            throw new Error(
              "No API key set. Pass { apiKey: 'YOUR_KEY' } to GoogleGenAI."
            );
          }

          const payload = buildPayload(contents);
          const url =
            GEMINI_ENDPOINT_BASE +
            "/" +
            encodeURIComponent(model) +
            ":generateContent";

          const res = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-goog-api-key": this.apiKey,
            },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(
              "[GoogleGenAI] HTTP " + res.status + " - " + text
            );
          }

          const json = await res.json();
          const txt = extractTextFromResponse(json);

          const wrapper = {
            raw: json,
          };

          // Make response.text behave like the official SDK (property)
          Object.defineProperty(wrapper, "text", {
            get: function () {
              return txt;
            },
          });

          return wrapper;
        },
      };
    }
  }

  // Export to global scope so Chrome extension scripts can access it.
  global.GoogleGenAI = GoogleGenAI;
})(typeof self !== "undefined" ? self : this);
