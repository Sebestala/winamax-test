import fs from "fs";
import path from "path";
import ReactMarkdown from "react-markdown";

export default async function MarkdownPage() {
  const markdownContent = await getMarkdownContent();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto">
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
