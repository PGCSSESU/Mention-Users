import type { User } from "../../types/mention";
import { extractMentions } from "../../hooks/extractMentions";
import { MentionText } from "./MentionText";

interface Props {
  text: string;
  mentionedUsers: Record<string, User>;
}

export function MentionPreview({ text, mentionedUsers }: Props) {
  const users = Object.values(mentionedUsers);
  const mentions = extractMentions(text, users);

  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  mentions.forEach((m) => {
    nodes.push(text.slice(cursor, m.start));

    const user = mentionedUsers[m.username];
    if (user) {
      nodes.push(
        <MentionText
          key={`${m.username}-${m.start}`}
          user={user}
        />
      );
    } else {
      nodes.push(text.slice(m.start, m.end));
    }

    cursor = m.end;
  });

  nodes.push(text.slice(cursor));

  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed">
      {nodes}
    </div>
  );
}
