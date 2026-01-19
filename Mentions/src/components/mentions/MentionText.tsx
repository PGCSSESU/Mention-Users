import { Link } from "react-router-dom";
import type { User } from "../../types/mention";
import { HoverCard } from "../hovercard/HoverCard";
import { UserCard } from "../hovercard/UserCard";

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
        <Link
          to={`/users/${user.username}`}
          className={`text-green-700 font-semibold cursor-pointer ${className}`}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {prefix}
          {user.username}
        </Link>
      }
      content={<UserCard user={user} />}
      openDelay={200}
    />
  );
}
