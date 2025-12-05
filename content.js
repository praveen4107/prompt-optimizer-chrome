function getPrompt() {
  const selectors = [
    "textarea",
    "p[contenteditable='true']",
    "div[contenteditable='true']",
    "p",
    ".editor"
  ];

  for (const s of selectors) {
    const el = document.querySelector(s);
    if (el && el.innerText.trim().length > 0) {
      return { element: el, text: el.value || el.innerText };
    }
  }

  return null;
}

function setPrompt(element, text) {
  if ("value" in element) {
    element.value = text;
  } else {
    element.innerText = text;
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "OPTIMIZE_PROMPT") {
    const promptObj = getPrompt();
    if (!promptObj) return alert("No prompt found on this page.");

    const userText = promptObj.text;

    const engineeringPrompt =
      `Optimize the following prompt using prompt-engineering principles.
       Make it clearer, more structured, and more effective.
       Keep the intent exactly the same.\n\nUSER PROMPT:\n${userText}`;

    chrome.runtime.sendMessage(
      { action: "CALL_GEMINI", prompt: engineeringPrompt },
      (res) => {
        if (res?.text) {
          setPrompt(promptObj.element, res.text.trim());
        } else {
          alert("Error: " + res.error);
        }
      }
    );
  }
});
