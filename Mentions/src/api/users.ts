import type { User } from "../types/mention";

const USERS_API = "http://localhost:3001/users";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(USERS_API);

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const raw = await res.json();

  return raw.map((u: any) => ({
    id: u.id,
    username: u.username.replace(/\s+/g, ""),
    displayName: u.displayname,
    avatar: u.avatar,
  }));
}
