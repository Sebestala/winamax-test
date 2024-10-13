import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

/**
 * Asynchronously renders a Markdown page with the content of README.md.
 *
 * @returns {Promise<JSX.Element>} A promise that resolves to the rendered component containing the Markdown content.
 *
 * Features:
 * - Retrieves the content of the "README.md" file from the root directory and display it as HTML page.
 */
export default async function MarkdownPage(): Promise<JSX.Element> {
  const markdownContent: string = await getMarkdownContent();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose prose-sm mx-auto sm:prose lg:prose-lg xl:prose-xl">
        <ReactMarkdown>{markdownContent}</ReactMarkdown>
      </div>
    </div>
  );
}

async function getMarkdownContent() {
  const filePath = path.join(process.cwd(), "/", "README.md");
  const fileContent = await fs.promises.readFile(filePath, "utf8");
  return fileContent;
}
