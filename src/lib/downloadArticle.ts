/**
 * Utility to download an article as a .txt file
 */
export function downloadArticleAsText(
  title: string,
  content: string,
  type: string
) {
  const filename = `${title.replace(/\s+/g, "_").toLowerCase()}.txt`;

  const textContent = `Title: ${title}
Type: ${type}
Downloaded: ${new Date().toLocaleString()}

---

${content}`;

  const blob = new Blob([textContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
