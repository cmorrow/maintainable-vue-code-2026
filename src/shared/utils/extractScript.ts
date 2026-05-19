export function extractScript(raw: string): string {
  const match = raw.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  return match?.[1].trim() ?? "";
}
