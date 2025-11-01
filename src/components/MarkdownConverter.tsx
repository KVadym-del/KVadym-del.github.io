import { createSignal, Show } from "solid-js";
import { marked } from "marked";
import DOMPurify from "dompurify";
import styles from "./MarkdownConverter.module.css";

/**
 * MarkdownConverter Component
 * Converts markdown to various formats with customizable text size
 */
export function MarkdownConverter() {
  const [markdown, setMarkdown] = createSignal("");
  const [fontSize, setFontSize] = createSignal(16);
  const [outputFormat, setOutputFormat] = createSignal<
    "html" | "text" | "preview"
  >("preview");
  const [copied, setCopied] = createSignal(false);

  /**
   * Convert markdown to HTML
   */
  const convertToHtml = () => {
    try {
      const rawHtml = marked.parse(markdown()) as string;
      return DOMPurify.sanitize(rawHtml);
    } catch (error) {
      console.error("Error converting markdown:", error);
      return "<p>Error converting markdown</p>";
    }
  };

  /**
   * Convert markdown to plain text
   */
  const convertToText = () => {
    const html = convertToHtml();
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };

  /**
   * Get output based on selected format
   */
  const getOutput = () => {
    const format = outputFormat();
    if (format === "html") {
      return convertToHtml();
    } else if (format === "text") {
      return convertToText();
    }
    return convertToHtml();
  };

  /**
   * Copy output to clipboard
   */
  const copyToClipboard = async () => {
    try {
      const output =
        outputFormat() === "preview" ? convertToHtml() : getOutput();
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  /**
   * Download output as file
   */
  const downloadOutput = () => {
    const output = outputFormat() === "preview" ? convertToHtml() : getOutput();
    const format = outputFormat();
    const extension =
      format === "html" ? "html" : format === "text" ? "txt" : "html";
    const mimeType = format === "text" ? "text/plain" : "text/html";

    const blob = new Blob([output], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Convert HTML to pdfmake content structure
   */
  const htmlToPdfContent = (html: string): any[] => {
    const temp = document.createElement("div");
    temp.innerHTML = html;

    const content: any[] = [];
    const baseFontSize = Math.max(10, Math.min(fontSize(), 14));

    const processNode = (node: Node): any => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent?.trim();
        return text ? { text, fontSize: baseFontSize } : null;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return null;

      const element = node as HTMLElement;

      switch (element.tagName.toLowerCase()) {
        case "h1":
          return {
            text: element.textContent || "",
            fontSize: baseFontSize * 2,
            bold: true,
            margin: [0, 15, 0, 5],
          };
        case "h2":
          return {
            text: element.textContent || "",
            fontSize: baseFontSize * 1.5,
            bold: true,
            margin: [0, 12, 0, 5],
          };
        case "h3":
          return {
            text: element.textContent || "",
            fontSize: baseFontSize * 1.25,
            bold: true,
            margin: [0, 10, 0, 5],
          };
        case "h4":
        case "h5":
        case "h6":
          return {
            text: element.textContent || "",
            fontSize: baseFontSize * 1.1,
            bold: true,
            margin: [0, 8, 0, 5],
          };
        case "p":
          return {
            text: element.textContent || "",
            fontSize: baseFontSize,
            margin: [0, 5, 0, 5],
          };
        case "strong":
        case "b":
          return {
            text: element.textContent || "",
            bold: true,
            fontSize: baseFontSize,
          };
        case "em":
        case "i":
          return {
            text: element.textContent || "",
            italics: true,
            fontSize: baseFontSize,
          };
        case "code":
          return {
            text: element.textContent || "",
            font: "Courier",
            fontSize: baseFontSize * 0.9,
            background: "#f4f4f4",
          };
        case "pre":
          return {
            text: element.textContent || "",
            font: "Courier",
            fontSize: baseFontSize * 0.9,
            margin: [0, 5, 0, 5],
            background: "#f4f4f4",
          };
        case "blockquote":
          return {
            text: element.textContent || "",
            margin: [20, 5, 0, 5],
            italics: true,
            color: "#666666",
          };
        case "ul":
          const ulItems = Array.from(element.querySelectorAll("li")).map(
            (li) => li.textContent || "",
          );
          return { ul: ulItems, fontSize: baseFontSize, margin: [0, 5, 0, 5] };
        case "ol":
          const olItems = Array.from(element.querySelectorAll("li")).map(
            (li) => li.textContent || "",
          );
          return { ol: olItems, fontSize: baseFontSize, margin: [0, 5, 0, 5] };
        case "a":
          return {
            text: element.textContent || "",
            link: element.getAttribute("href") || "",
            color: "#0066cc",
            decoration: "underline",
            fontSize: baseFontSize,
          };
        case "hr":
          return {
            canvas: [
              { type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 },
            ],
            margin: [0, 10, 0, 10],
          };
        case "br":
          return { text: "\n", fontSize: baseFontSize };
        default:
          return { text: element.textContent || "", fontSize: baseFontSize };
      }
    };

    Array.from(temp.childNodes).forEach((node) => {
      const processed = processNode(node);
      if (processed) {
        if (Array.isArray(processed)) {
          content.push(...processed);
        } else {
          content.push(processed);
        }
      }
    });

    return content;
  };

  /**
   * Export to PDF using pdfmake (true text-based, copyable PDF)
   */
  const exportToPDF = async () => {
    try {
      // Dynamically import pdfmake
      const pdfMake = await import("pdfmake/build/pdfmake");
      const pdfFonts = await import("pdfmake/build/vfs_fonts");

      // Set up fonts
      (pdfMake as any).vfs = pdfFonts;

      const html = convertToHtml();
      const content = htmlToPdfContent(html);

      const docDefinition: any = {
        content: content,
        defaultStyle: {
          fontSize: Math.max(10, Math.min(fontSize(), 14)),
          font: "Roboto",
        },
        pageSize: "A4",
        pageMargins: [40, 40, 40, 40],
      };

      (pdfMake as any).createPdf(docDefinition).download("converted.pdf");
    } catch (error) {
      console.error("Failed to export to PDF:", error);
      alert("Failed to export to PDF. Please try a different format.");
    }
  };

  /**
   * Export to DOCX (using RTF format for compatibility)
   */
  const exportToDOCX = () => {
    try {
      const html = convertToHtml();

      // Create a styled HTML document for Word
      const styledHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: ${fontSize()}pt;
      line-height: 1.6;
      color: #000000;
      margin: 40px;
    }
    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
      color: #000000;
    }
    h1 { font-size: 2em; border-bottom: 2px solid #000000; padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid #666666; padding-bottom: 0.3em; }
    h3 { font-size: 1.25em; }
    p { margin: 1em 0; }
    a { color: #0066cc; text-decoration: underline; }
    code {
      background-color: #f4f4f4;
      padding: 2px 4px;
      border-radius: 3px;
      font-family: Consolas, Monaco, monospace;
      font-size: 0.9em;
    }
    pre {
      background-color: #f4f4f4;
      padding: 1em;
      border-radius: 5px;
      overflow-x: auto;
      border: 1px solid #dddddd;
    }
    pre code {
      background-color: transparent;
      padding: 0;
    }
    blockquote {
      border-left: 4px solid #0066cc;
      padding-left: 1em;
      margin: 1em 0;
      color: #666666;
      font-style: italic;
    }
    ul, ol {
      margin: 1em 0;
      padding-left: 2em;
    }
    li { margin: 0.5em 0; }
    table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    th, td {
      border: 1px solid #dddddd;
      padding: 0.75em;
      text-align: left;
    }
    th {
      background-color: #f4f4f4;
      font-weight: 600;
    }
    hr {
      border: none;
      border-top: 2px solid #dddddd;
      margin: 2em 0;
    }
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
${html}
</body>
</html>`;

      // Create blob with UTF-8 BOM for proper character encoding
      const BOM = "\uFEFF";
      const blob = new Blob([BOM + styledHtml], {
        type: "application/msword;charset=utf-8",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.doc";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export to Word:", error);
      alert("Failed to export document. Please try a different format.");
    }
  };

  /**
   * Load sample markdown
   */
  const loadSample = () => {
    const sample = `# Sample Markdown Document

## Introduction
This is a **sample** markdown document with various formatting options.

### Features
- **Bold text**
- *Italic text*
- \`inline code\`
- [Links](https://example.com)

### Code Block
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

### Lists
1. First item
2. Second item
3. Third item

### Blockquote
> This is a blockquote with some important information.

### Table
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

---

**That's all!** Feel free to edit this markdown.`;
    setMarkdown(sample);
  };

  return (
    <div class={styles.container}>
      <div class={styles.header}>
        <h1 class={styles.title}>Markdown Converter</h1>
        <p class={styles.subtitle}>
          Convert markdown to HTML, plain text, PDF, or Word format
        </p>
      </div>

      <div class={styles.controls}>
        <div class={styles.controlGroup}>
          <label for="fontSize" class={styles.label}>
            Font Size: {fontSize()}px
          </label>
          <input
            id="fontSize"
            type="range"
            min="10"
            max="32"
            step="1"
            value={fontSize()}
            onInput={(e) => setFontSize(parseInt(e.currentTarget.value))}
            class={styles.slider}
          />
        </div>

        <div class={styles.controlGroup}>
          <label for="outputFormat" class={styles.label}>
            Output Format:
          </label>
          <select
            id="outputFormat"
            value={outputFormat()}
            onChange={(e) => setOutputFormat(e.currentTarget.value as any)}
            class={styles.select}
          >
            <option value="preview">Preview (Rendered HTML)</option>
            <option value="html">HTML Source</option>
            <option value="text">Plain Text</option>
          </select>
        </div>

        <button onClick={loadSample} class={styles.button}>
          Load Sample
        </button>
      </div>

      <div class={styles.editorContainer}>
        <div class={styles.editorPane}>
          <div class={styles.paneHeader}>
            <h2 class={styles.paneTitle}>Markdown Input</h2>
          </div>
          <textarea
            value={markdown()}
            onInput={(e) => setMarkdown(e.currentTarget.value)}
            placeholder="Enter your markdown here..."
            class={styles.textarea}
            style={{ "font-size": `${fontSize()}px` }}
          />
        </div>

        <div class={styles.outputPane}>
          <div class={styles.paneHeader}>
            <h2 class={styles.paneTitle}>Output</h2>
            <div class={styles.paneActions}>
              <button
                onClick={copyToClipboard}
                class={styles.actionButton}
                title="Copy to clipboard"
              >
                {copied() ? "✓ Copied!" : "📋 Copy"}
              </button>
              <button
                onClick={downloadOutput}
                class={styles.actionButton}
                title="Download file"
              >
                💾 Download
              </button>
              <button
                onClick={exportToPDF}
                class={styles.actionButton}
                title="Export to PDF"
              >
                📄 PDF
              </button>
              <button
                onClick={exportToDOCX}
                class={styles.actionButton}
                title="Export to Word document"
              >
                📝 Word
              </button>
            </div>
          </div>

          <Show
            when={outputFormat() === "preview"}
            fallback={
              <pre
                class={styles.codeOutput}
                style={{ "font-size": `${fontSize()}px` }}
              >
                {getOutput()}
              </pre>
            }
          >
            <div
              class={styles.preview}
              style={{ "font-size": `${fontSize()}px` }}
              innerHTML={convertToHtml()}
            />
          </Show>
        </div>
      </div>

      <div class={styles.info}>
        <h3 class={styles.infoTitle}>How to use:</h3>
        <ul class={styles.infoList}>
          <li>Type or paste your markdown in the left panel</li>
          <li>Adjust the font size using the slider</li>
          <li>
            Choose your desired output format (Preview, HTML, or Plain Text)
          </li>
          <li>Preview the result in real-time</li>
          <li>Copy to clipboard or download as HTML/TXT file</li>
          <li>
            Export directly to PDF or Word document format using the dedicated
            buttons
          </li>
        </ul>
      </div>
    </div>
  );
}
