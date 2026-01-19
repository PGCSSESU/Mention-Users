import React, { useEffect, useState } from "react";
import { MentionInput } from "./components/mentions/MentionInput";
import { MentionPreview } from "./components/mentions/MentionPreview";
import type { User } from "./types/mention";
import { fetchUsers } from "./api/users";
import { Tabs} from "./components/tab/Tabs";
import type { Tab } from "./types/Tab";

const App: React.FC = () => {
  const [text, setText] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [tab, setTab] = useState<Tab>("write");

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-xl mx-auto p-6">
      <Tabs active={tab} onChange={setTab} />

      {tab === "write" ? (
        <MentionInput
          value={text}
          users={users}
          onChange={setText}
        />
      ) : (
        <MentionPreview
          text={text}
          users={users}
        />
      )}
    </div>
  );
};

export default App;
