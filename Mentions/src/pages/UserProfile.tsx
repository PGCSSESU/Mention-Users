import { useParams, Link } from "react-router-dom";
import type { User } from "../types/mention";

interface Props {
  users: Record<string, User>;
}

export function UserProfile({ users }: Props) {
  const { username } = useParams<{ username: string }>();
  const user = username ? users[username] : null;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-gray-700 mb-4">User not found</p>
          <Link
            to="/"
            className="text-blue-600 font-medium hover:underline"
          >
            ← Back to comments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        {/* Avatar */}
        <div className="flex justify-center">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-24 h-24 rounded-full border shadow-sm"
          />
        </div>

        {/* User Info */}
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            {user.displayName}
          </h2>
          <p className="text-gray-500 mt-1">@{user.username}</p>
        </div>

        {/* Divider */}
        <div className="my-6 border-t" />

        {/* Meta / Actions */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-4">
            This profile was mentioned in a comment.
          </p>

          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition"
          >
            ← Back to Preview
          </Link>
        </div>
      </div>
    </div>
  );
}
