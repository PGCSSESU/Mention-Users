import type { User } from "../../types/mention";

export function UserCard({ user }: { user: User }) {
  return (
    <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50 p-3">
      <div className="flex gap-3 items-center">
        {user.avatar && (
          <img
            src={user.avatar}
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <p className="font-semibold">{user.displayName}</p>
          <p className="text-xs text-gray-500">@{user.username}</p>
        </div>
      </div>
    </div>
  );
}
