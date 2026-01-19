import { useState } from "react";
import type { User } from "../types/mention";

export function useMentionStore() {
  const [mentionedUsers, setMentionedUsers] =
    useState<Record<string, User>>({});

  const addMention = (user: User) => {
    setMentionedUsers(prev => ({
      ...prev,
      [user.username]: user,
    }));
  };

  return {
    mentionedUsers,
    addMention,
  };
}
