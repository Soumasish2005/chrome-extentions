document.addEventListener("DOMContentLoaded", () => {
  const summarizeButton = document.getElementById("summarizeButton");
  const summaryContainer = document.getElementById("summary");

  summarizeButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: getSelectedText,
        },
        (selection) => {
          const content = selection[0].result;
          if (content) {
            chrome.runtime.sendMessage(
              { action: "summarize", content: content },
              (response) => {
                summaryContainer.textContent = response.summary;
              }
            );
          } else {
            summaryContainer.textContent = "Please select text to summarize.";
          }
        }
      );
    });
  });
});

function getSelectedText() {
  return window.getSelection().toString();
}
