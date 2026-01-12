import React, { useEffect, useRef, useState } from "react";
import { Command } from "cmdk";
import type { User, Mention } from "../types/mention";
import { MentionedUsers } from "./MentionedUsers";

function extractMentions(text: string, users: User[]): Mention[] {
  if (!text || !users.length) return [];

  const regex = /@([a-zA-Z0-9._-]+)\b/g;
  const mentions: Mention[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text))) {
    const username = match[1];
    const user = users.find((u) => u.username === username);
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


const Preview = ({
  text,
  users,
}: {
  text: string;
  users: User[];
}) => {
  const mentions = extractMentions(text, users);

  const nodes: React.ReactNode[] = [];
  let cursor = 0;

  mentions
    .sort((a, b) => a.start - b.start)
    .forEach((m, i) => {
      nodes.push(text.slice(cursor, m.start));

      const user = users.find((u) => u.id === m.id);
      if (user) {
        nodes.push(<MentionedUsers key={i} user={user} />);
      }

      cursor = m.end;
    });

  nodes.push(text.slice(cursor));

  return (
    <div className="whitespace-pre-wrap text-sm leading-relaxed">
      {nodes}
    </div>
  );
};


export default function Mentions() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const commandRef = useRef<HTMLDivElement>(null);

  const [text, setText] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [tab, setTab] = useState<"write" | "preview">("write");

  /* -------- Fetch Users -------- */

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:3001/users");
      const raw = await res.json();

      const normalized: User[] = raw.map((u: any) => ({
        id: u.id,
        username: u.username.toLowerCase().replace(/\s+/g, "_"),
        displayName: u.displayname,
        avatar: u.avatar,
      }));

      setUsers(normalized);
    };

    fetchUsers();
  }, []);

  const caret = textareaRef.current?.selectionStart ?? 0;
  const suppressDropdownRef = useRef(false);
  const beforeCaret = text.slice(0, caret);
  const match = beforeCaret.match(/@([a-zA-Z0-9._-]*)$/);
  const query = match?.[1] ?? "";
  
  const isOpen = Boolean(match) && !suppressDropdownRef.current;

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(query.toLowerCase())
  );


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const insertMention = (user: User) => {
    if (!textareaRef.current || !match) return;
  suppressDropdownRef.current = true;
    const start = caret - match[0].length;
    const before = text.slice(0, start);
    const after = text.slice(caret);
 

    const insert = `@${user.username} `;
    setText(before + insert + after);

    requestAnimationFrame(() => {
      textareaRef.current!.selectionStart =
        textareaRef.current!.selectionEnd =
          start + insert.length;
      textareaRef.current!.focus();
       suppressDropdownRef.current = false;
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!isOpen) return;

    if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) {
      e.preventDefault();
      commandRef.current?.dispatchEvent(
        new KeyboardEvent("keydown", { key: e.key, bubbles: true })
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="flex gap-6 mb-4 text-green-800">
        {["write", "preview"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`pb-2 text-lg ${
              tab === t
                ? "border-b-2 border-green-600 font-semibold"
                : "text-green-700"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "write" ? (
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Leave a comment…"
            className="w-full min-h-[160px] border rounded-md p-3 text-sm resize-y"
          />

          {isOpen && filteredUsers.length > 0 && (
            <Command
              ref={commandRef}
              className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow z-10"
            >
              <Command.List className="max-h-48 overflow-y-auto">
                {filteredUsers.map((u) => (
                  <Command.Item
                    key={u.id}
                    onSelect={() => insertMention(u)}
                    className="px-3 py-2 cursor-pointer aria-selected:bg-gray-100"
                  >
                    <div className="flex gap-3 items-center">
                      {u.avatar && (
                        <img
                          src={u.avatar}
                          className="w-6 h-6 rounded-full"
                        />
                      )}
                      <p className="text-sm font-medium">
                        {u.displayName}
                      </p>
                    </div>
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          )}
        </div>
      ) : (
        <Preview text={text} users={users} />
      )}
    </div>
  );
}
