chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "summarize") {
      fetchSummary(request.content, sendResponse);
      return true; // Keep the message channel open for async response
    }
  });
  
  async function fetchSummary(content, sendResponse) {
    const apiKey = ''; 
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Summarize this: ${content}` }]
          }]
        })
      });
  
      const data = await response.json();
      
      if (data && data.candidates && data.candidates.length > 0) {
        const summary = data.candidates[0].content.parts[0].text;
        sendResponse({ summary });
      } else {
        sendResponse({ summary: "No summary available." });
      }
    } catch (error) {
      console.error("Error fetching summary:", error);
      sendResponse({ summary: "Error fetching summary. Please try again later." });
    }
  }
  