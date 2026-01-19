import type { Tab } from "../../types/Tab";

interface TabsProps {
  active: Tab;
  onChange: (tab: Tab) => void;
}

export function Tabs({ active, onChange }: TabsProps) {
  return (
    <div className="flex gap-6 mb-4 text-green-800">
      {(["write", "preview"] as Tab[]).map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`pb-2 text-lg ${
            active === tab
              ? "border-b-2 border-green-600 font-semibold"
              : "text-green-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
