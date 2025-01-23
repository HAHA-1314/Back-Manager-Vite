function extractTextFromHTML(htmlString) {
  // 创建一个 DOMParser 实例
  const parser = new DOMParser();
  // 将 HTML 字符串解析为文档
  const doc = parser.parseFromString(htmlString, "text/html");
  // 提取文档中的文本内容
  return doc.body.textContent.trim();
}
export default extractTextFromHTML;