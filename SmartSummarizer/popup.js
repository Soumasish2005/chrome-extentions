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
                renderMarkdown(response.summary);
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

function renderMarkdown(mdText) {
  try {
    let html = marked.parse(mdText, {
      breaks: true,
      gfm: true,
    });

    document.getElementById("summary").innerHTML = html;
  } catch (error) {
    console.error("Markdown parsing error:", error);
    document.getElementById("summary").innerHTML = `
      <p style="color: red;">Error rendering summary.</p>
      <pre>${mdText}</pre>
    `;
  }
}
