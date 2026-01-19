import { useEffect, useState } from "react";
import type { User } from "../types/mention";
import { fetchUsers } from "../api/users";
import { useDebounce } from "./useDebounce";

export function useMentionSearch(text: string) {
  const [users, setUsers] = useState<User[]>([]);

  const match = text.match(/(?:^|\s)@([a-zA-Z0-9._-]*)$/);
  const isActive = Boolean(match);
  const query = match ? match[1] : null;

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (!isActive) {
      setUsers([]);
      return;
    }

    fetchUsers(debouncedQuery, 10)
      .then(setUsers)
      .catch(console.error);
  }, [debouncedQuery, isActive]);

  return {
    users,
    isActive,
    query,
  };
}
