import type { User, Mention } from "../types/mention";

export function extractMentions(
  text: string,
  users: User[]
): Mention[] {
  if (!text || !users.length) return [];

  const regex = /@([a-zA-Z0-9._-]+)\b/g;
  const mentions: Mention[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    const username = match[1];
    const user = users.find(u => u.username === username);
    if (!user) continue;

    mentions.push({
      id: user.id,
      username,
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  return mentions;
}
