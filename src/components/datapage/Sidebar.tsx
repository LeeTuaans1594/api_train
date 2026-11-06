import ItemList from "./ItemList";
import { type Devices } from "../../api/getAPI";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
interface SidebarProps {
  devices: Devices[] | undefined;
  setKeyword: (key: string) => void;
  selectedId: string | undefined;
  setSelectedItem: (item: Devices | undefined) => void;
}

export default function Sidebar({
  devices,
  setKeyword,
  selectedId,
  setSelectedItem,
}: SidebarProps) {
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const wait = setTimeout(() => {
      setKeyword(text);
    }, 500);
    return () => clearTimeout(wait);
  }, [text]);

  return (
    <aside className="flex flex-col gap-5 w-3/11 px-4 py-6 bg-taupe-900 border-taupe-600 border-r h-full">
      <div className="flex w-full items-center relative">
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          className="bg-taupe-700 rounded-md p-2 flex-1"
        />
        <button
          onClick={() => {
            setText("");
          }}
          className="absolute right-2 cursor-pointer"
        >
          <X />
        </button>
      </div>
      <ul className="flex min-h-0 flex-1 flex-col bg-taupe-700 rounded-2xl overflow-y-auto p-4">
        {devices?.length ? (
          <ItemList
            item={devices[0]}
            selectedId={selectedId}
            setSelectedItem={setSelectedItem}
          />
        ) : (
          <p className="text-center font-medium text-2xl">
            Không có dữ liệu nào được tìm thấy
          </p>
        )}
      </ul>
    </aside>
  );
}
