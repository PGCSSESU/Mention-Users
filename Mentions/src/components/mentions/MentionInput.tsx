import { useRef } from "react";
import type { User } from "../../types/mention";
import { MentionDropdown } from "./MentionDropdown";

interface Props {
  value: string;
  users: User[];
  onChange: (value: string) => void;
  onMentionSelect: (user: User) => void;
}

export function MentionInput({
  value,
  users,
  onChange,
  onMentionSelect,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suppressRef = useRef(false);
  const wasOpenRef = useRef(false);

  const caret = textareaRef.current?.selectionStart ?? 0;
  const beforeCaret = value.slice(0, caret);

  const match = beforeCaret.match(/(?:^|\s)@([a-zA-Z0-9._-]*)$/);
  const isOpen = Boolean(match) && !suppressRef.current;
  const query = match ? match[1] : "";
  const justOpened = isOpen && !wasOpenRef.current;
  wasOpenRef.current = isOpen;

  const insertMention = (user: User) => {
    if (!textareaRef.current || !match) return;

    suppressRef.current = true;
    onMentionSelect(user);

    const mentionText = match[0].trimStart();
    const start = caret - mentionText.length;

    const before = value.slice(0, start);
    const after = value.slice(caret);
    const insert = `@${user.username} `;

    onChange(before + insert + after);

    requestAnimationFrame(() => {
      const pos = start + insert.length;
      textareaRef.current!.selectionStart = pos;
      textareaRef.current!.selectionEnd = pos;
      textareaRef.current!.focus(); 
      suppressRef.current = false;
    });
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full min-h-[160px] border rounded-md p-3 text-sm resize-y"
      />

      {isOpen && (
        <MentionDropdown
          users={users}
          query={query}
          autoFocus={justOpened}   
          onSelect={insertMention}
        />
      )}
    </div>
  );
}
