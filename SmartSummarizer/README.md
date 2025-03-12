# SmartSummarizer

SmartSummarizer is a Chrome extension that helps users summarize long articles and highlight key points on webpages. It uses the Google Generative Language API to generate summaries in Markdown format and highlights the most important sentences directly on the webpage.

## Features
- Summarizes selected text or entire webpage content.
- Highlights key points and important sections.
- Provides structured summaries using Markdown syntax.
- Easy-to-use popup interface.

## Installation
1. Clone the repository to your local machine:
   ```sh
   git clone https://github.com/Soumasish2005/chrome-extentions.git
   ```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" by toggling the switch in the top right corner.
4. Click on "Load unpacked" and select the `chrome-extentions/SmartSummarizer` directory.

## Usage
1. Navigate to any webpage you want to summarize and select text inside the webpage.
2. Click on SmartSummarizer extension icon in the Chrome toolbar.
3. In the popup, click the "Summarize" button.
4. The extension will fetch the selected text or entire page content, generate a summary, and display it in the popup.
5. Key points and important sections will be highlighted.

## File Structure
```
chrome-extentions/
├── SmartSummarizer/
│   ├── assets/
│   │   └── styles.css
│   ├── libs/
│   │   └── marked.min.js
│   ├── background.js
│   ├── content.js
│   ├── manifest.json
│   ├── popup.html
│   ├── popup.js
│   └── README.md
├── LICENSE
└── README.md
```

## Files
- `background.js`: Handles background tasks and communicates with the Google Generative Language API.
- `content.js`: Extracts and highlights text on the webpage.
- `popup.js`: Manages the popup interface and user interactions.
- `popup.html`: The HTML structure of the popup interface.
- `assets/styles.css`: Styles for the popup interface.
- `libs/marked.min.js`: Library for parsing Markdown to HTML.
- `manifest.json`: Configuration file for the Chrome extension.

## License
This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## Contact
For any questions or support, please contact [your email].

