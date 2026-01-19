import type { User } from "../types/mention";

const USERS_API = "http://localhost:3001/users";

export async function fetchUsers(
  query: string | null,
  limit = 10
): Promise<User[]> {
  const url =
    query && query.length > 0
      ? `${USERS_API}?username_like=${encodeURIComponent(query)}`
      : `${USERS_API}?_limit=${limit}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch users");

  const raw = await res.json();

  const mapped: User[] = raw.map((u: any) => ({
    id: u.id,
    username: u.username,
    displayName: u.displayname,
    avatar: u.avatar,
  }));

  // 🔒 FINAL SAFETY FILTER (MANDATORY for json-server)
  if (query) {
    return mapped
      .filter(u =>
        u.username.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, limit);
  }

  return mapped;
}
