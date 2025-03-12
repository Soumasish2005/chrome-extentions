document.getElementById('summarizeBtn').addEventListener('click', () => {
    // Query the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      // Send a message to the content script of the active tab
      chrome.tabs.sendMessage(tabs[0].id, { action: 'summarize' }, (response) => {
        const summaryDiv = document.getElementById('summary');
        if (response && response.summary) {
          // Display the summary (each sentence separated by a newline)
          summaryDiv.innerText = response.summary.join('\n\n');
        } else {
          summaryDiv.innerText = 'No summary available.';
        }
      });
    });
  });
  