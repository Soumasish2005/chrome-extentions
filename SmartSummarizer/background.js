chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "summarize") {
    fetchSummary(request.content, sendResponse);
    return true; // Keep the message channel open for async response
  }
});

async function fetchSummary(content, sendResponse) {
  const apiKey = 'AIzaSyAzPdoHCoRtQbKYfuxHDDIS6wsBdhgy_yM'; 
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: `Summarize the following content in a structured format **using Markdown**:
          
            Content: ${content}
            
            Provide the output strictly in this format:
            
            # Summary
            (A brief overall summary in 2-3 sentences)
            
            ## Key Points
            - (Bullet points of the most critical information)
            
            ## Important Sections
            - (Mention key sections or paragraphs that are important)
            
            ## Highlights
            - (Notable facts, statistics, or crucial insights)
            
            Make sure to use proper Markdown syntax for headings, bullet points, and formatting.`
          }]
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
