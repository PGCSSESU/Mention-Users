import type { User } from "../../types/mention";
import { extractMentions } from "./extractMentions";
import { MentionText } from "./MentionText";

interface Props {
  text: string;
  users: User[];
}

export function MentionPreview({ text, users }: Props) {
  const mentions = extractMentions(text, users);
  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  mentions.forEach((m, i) => {
    nodes.push(text.slice(cursor, m.start));

    const user = users.find(u => u.id === m.id);
    if (user) {
      nodes.push(<MentionText key={i} user={user} />);
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
