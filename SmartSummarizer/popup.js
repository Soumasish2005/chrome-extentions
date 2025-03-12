document.addEventListener("DOMContentLoaded", () => {
  const summarizeButton = document.getElementById("summarizeBtn");
  const summaryContainer = document.getElementById("summary");

  if (!summarizeButton || !summaryContainer) {
    console.error("Popup elements not found!");
    return;
  }

  summarizeButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: getSelectedText,
        },
        (selection) => {
          if (!selection || selection.length === 0 || !selection[0].result) {
            summaryContainer.textContent = "Please select text to summarize.";
            return;
          }

          const content = selection[0].result;
          chrome.runtime.sendMessage(
            { action: "summarize", content: content },
            (response) => {
              if (response?.summary) {
                // Convert Markdown to HTML using Marked.js
                summaryContainer.innerHTML = marked.parse(response.summary);
              } else {
                summaryContainer.textContent = "No summary available.";
              }
            }
          );
        }
      );
    });
  });
});

function getSelectedText() {
  return window.getSelection().toString();
}
