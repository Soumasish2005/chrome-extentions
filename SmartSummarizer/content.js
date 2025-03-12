// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarize') {
      // Extract all visible text from the page body
      const text = document.body.innerText || "";
      
      // Split the text into sentences using a regular expression
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
      
      // Build a word frequency table (ignoring words with 3 or fewer characters)
      const wordFreq = {};
      const words = text.replace(/[^a-zA-Z ]/g, ' ').toLowerCase().split(/\s+/);
      words.forEach(word => {
        if (word.length > 3) {
          wordFreq[word] = (wordFreq[word] || 0) + 1;
        }
      });
      
      // Score each sentence based on the frequency of its words
      const sentenceScores = sentences.map(sentence => {
        let score = 0;
        const sentenceWords = sentence.replace(/[^a-zA-Z ]/g, ' ').toLowerCase().split(/\s+/);
        sentenceWords.forEach(word => {
          score += wordFreq[word] || 0;
        });
        return { sentence: sentence.trim(), score };
      });
      
      // Sort sentences by their score in descending order and pick the top 3
      sentenceScores.sort((a, b) => b.score - a.score);
      const topSentences = sentenceScores.slice(0, 3).map(item => item.sentence);
      
      // Highlight the selected sentences on the page
      highlightSentences(topSentences);
      
      // Send the summary back to the popup
      sendResponse({ summary: topSentences });
    }
  });
  
  // Function to highlight sentences on the page
  function highlightSentences(sentencesToHighlight) {
    // For simplicity, iterate over paragraph elements and highlight those containing a top sentence
    const paragraphs = document.querySelectorAll("p");
    paragraphs.forEach(p => {
      sentencesToHighlight.forEach(sentence => {
        if (p.innerText.includes(sentence)) {
          p.style.backgroundColor = "#ffff99"; // Light yellow highlight
        }
      });
    });
  }
  