import { marked } from 'marked';
import highlight from 'highlight.js';

const customRenderer = new marked.Renderer();

// Custom <code> tag parsing
customRenderer.code = (code, lang) => {
    const language = highlight.getLanguage(lang) ? lang : 'plaintext';
    const highlightedCode = highlight.highlight(code, { language }).value;
    const encodedCode = encodeURI(highlightedCode);
    return `
    <code class="hljs language-${language}">
        ${encodedCode}
    </code>
    `;
};

// Custom <a> tag parsing
customRenderer.link = (href, title, text) => `<a href="${href}" title="${title}" target="_blank">${text}</a>`;

export default customRenderer;