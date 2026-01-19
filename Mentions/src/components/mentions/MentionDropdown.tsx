import { Command } from "cmdk";
import type { User } from "../../types/mention";
import { useEffect, useRef } from "react";

interface Props {
  users: User[];
  onSelect: (user: User) => void;
  query: string;
  autoFocus: boolean;
}

export function MentionDropdown({
  users,
  onSelect,
  query,
  autoFocus,
}: Props) {
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus) {
      commandRef.current?.focus(); 
    }
  }, [autoFocus]);

  if (!users.length) return null;

  return (
    <Command
      ref={commandRef}
      tabIndex={-1}
      key={query}
      className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow z-10"
    >
      <Command.List className="max-h-48 overflow-y-auto">
        {users.map(u => (
          <Command.Item
            key={u.id}
            onSelect={() => onSelect(u)}
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
  );
}
