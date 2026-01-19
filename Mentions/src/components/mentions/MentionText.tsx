import type { User } from "../../types/mention";
import { HoverCard } from "../hovercard/HoverCard";
import { UserCard } from "./UserCard";

interface MentionTextProps {
  user: User;
  prefix?: string;
  className?: string;
}

export function MentionText({
  user,
  prefix = "@",
  className = "",
}: MentionTextProps) {
  return (
    <HoverCard
      trigger={
        <span
          className={`text-green-700 font-semibold cursor-pointer ${className}`}
        >
          {prefix}
          {user.username}
        </span>
      }
      content={<UserCard user={user} />}
      openDelay={200}
    />
  );
}
