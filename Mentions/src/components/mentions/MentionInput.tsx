import { useRef } from "react";
import type { User } from "../../types/mention";
import { MentionDropdown } from "./MentionDropdown";

interface Props {
  value: string;
  users: User[];
  onChange: (value: string) => void;
}

export function MentionInput({ value, users, onChange }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const suppressRef = useRef(false);

  const caret = textareaRef.current?.selectionStart ?? 0;
  const beforeCaret = value.slice(0, caret);

  const match = beforeCaret.match(/(?:^|\s)@([a-zA-Z0-9._-]*)$/);
  const query = match?.[1] ?? "";

  const isOpen = Boolean(match) && !suppressRef.current;

  const filteredUsers = users.filter(u =>
    u.username.toLowerCase().includes(query.toLowerCase())
  );

  const insertMention = (user: User) => {
    if (!textareaRef.current || !match) return;

    suppressRef.current = true;

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isOpen) return;

    if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
      e.preventDefault();
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: e.key,
          bubbles: true,
        })
      );
    }
  };

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full min-h-[160px] border rounded-md p-3 text-sm resize-y"
      />

      {isOpen && (
        <MentionDropdown
          users={filteredUsers}
          onSelect={insertMention}
        />
      )}
    </div>
  );
}
