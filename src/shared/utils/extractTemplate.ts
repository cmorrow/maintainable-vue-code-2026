export function extractTemplate(raw: string, removeHeader = false): string {
  const match = raw.match(/<template>([\s\S]*?)<\/template>/);
  let inner = match?.[1] ?? "";

  if (removeHeader) {
    inner = inner.replace(
      /(<header[^>]*>)[\s\S]*?(<\/header>)/,
      "$1...$2",
    );
  }

  const lines = inner.split("\n");
  const nonEmptyLines = lines.filter((l) => l.trim().length > 0);
  const minIndent = nonEmptyLines.length
    ? Math.min(...nonEmptyLines.map((l) => l.match(/^(\s*)/)?.[1].length ?? 0))
    : 0;

  const normalized = lines
    .map((line) => (line.trim() ? "  " + line.slice(minIndent) : ""))
    .join("\n")
    .replace(/^\n+/, "")
    .replace(/\n+$/, "");

  return `<template>\n${normalized}\n</template>`;
}
