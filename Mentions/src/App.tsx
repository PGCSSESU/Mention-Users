import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { MentionInput } from "./components/mentions/MentionInput";
import { MentionPreview } from "./components/mentions/MentionPreview";
import { Tabs } from "./components/tab/Tabs";
import type { Tab } from "./types/Tab";

import { useMentionSearch } from "./hooks/useMentionSearch";
import { useMentionStore } from "./hooks/useMentionStore";

import { UserProfile } from "./pages/UserProfile";

const App: React.FC = () => {
  const [text, setText] = useState("");
  const [tab, setTab] = useState<Tab>("write");

  const { users } = useMentionSearch(text);
  const { mentionedUsers, addMention } = useMentionStore();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="max-w-xl mx-auto p-6">
            <Tabs active={tab} onChange={setTab} />

            {tab === "write" ? (
              <MentionInput
                value={text}
                users={users}
                onChange={setText}
                onMentionSelect={addMention}
              />
            ) : (
              <MentionPreview
                text={text}
                mentionedUsers={mentionedUsers}
              />
            )}
          </div>
        }
      />
      <Route
        path="/users/:username"
        element={
          <UserProfile users={mentionedUsers} />
        }
      />
    </Routes>
  );
};

export default App;
