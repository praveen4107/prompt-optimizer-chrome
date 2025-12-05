const firstTimePage = document.getElementById("first-time");
const mainUI = document.getElementById("main-ui");
const changeUI = document.getElementById("change-key-ui");

chrome.storage.local.get("gemini_api_key", ({ gemini_api_key }) => {
  if (!gemini_api_key) {
    firstTimePage.classList.remove("hidden");
  } else {
    mainUI.classList.remove("hidden");
  }
});

document.getElementById("save-key").addEventListener("click", () => {
  const key = document.getElementById("api-key").value;
  chrome.storage.local.set({ gemini_api_key: key }, () => {
    firstTimePage.classList.add("hidden");
    mainUI.classList.remove("hidden");
  });
});

document.getElementById("change-key-btn").addEventListener("click", () => {
  mainUI.classList.add("hidden");
  changeUI.classList.remove("hidden");
});

document.getElementById("cancel-change").addEventListener("click", () => {
  changeUI.classList.add("hidden");
  mainUI.classList.remove("hidden");
});

document.getElementById("save-new-key").addEventListener("click", () => {
  const newKey = document.getElementById("new-api-key").value;
  chrome.storage.local.set({ gemini_api_key: newKey }, () => {
    changeUI.classList.add("hidden");
    mainUI.classList.remove("hidden");
  });
});

document.getElementById("optimize-btn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "OPTIMIZE_PROMPT" });
  });
});
