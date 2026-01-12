import { useState } from "react";
import type { User } from "../types/mention.ts";
import { UserHoverCard } from "./UserHoverCard";

export function MentionedUsers({ user }: { user: User }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative text-green-700 font-semibold cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      @{user.username}
      {hovered && <UserHoverCard user={user} />}
    </span>
  );
}
