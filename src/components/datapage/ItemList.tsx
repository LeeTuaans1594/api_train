import { ChevronRight, Box, Cpu } from "lucide-react";
import type { Devices } from "../../api/getAPI";
import { useState } from "react";
interface ItemListProps {
  item: Devices | undefined;
  selectedId: string | undefined;
  setSelectedItem: (item: Devices | undefined) => void;
}

export default function ItemList({
  item,
  selectedId,
  setSelectedItem,
}: ItemListProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const hasChildren = !!item?.children.length;

  return (
    <li className="flex flex-col h-fit w-full">
      <div className="flex flex-row items-center">
        {hasChildren && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="cursor-pointer rounded hover:bg-taupe-600 hover:text-white"
          >
            <ChevronRight
              className={`${isOpen ? "rotate-90" : ""} transition-transform duration-100`}
            />
          </button>
        )}

        <button
          onClick={() => setSelectedItem(item)}
          className={`${selectedId === item?.id && `bg-taupe-800`} flex flex-1 justify-between hover:bg-taupe-800 items-center p-1 rounded-md cursor-pointer`}
        >
          <span className="flex gap-1 items-center">
            {item?.entity_type === "ASSET" ? (
              <Box className="shrink-0" />
            ) : (
              <Cpu className="shrink-0" />
            )}
            <p className="text-start">{item?.name}</p>
          </span>
          <p className="px-2 py-1 bg-taupe-800 rounded-full ml-auto text-sm whitespace-normal">
            {item?.children?.length}
          </p>
        </button>
      </div>

      {hasChildren && isOpen && (
        <ul className="flex flex-col ml-6 gap-2">
          {item.children.map((child) => {
            return (
              <ItemList
                item={child}
                selectedId={selectedId}
                setSelectedItem={setSelectedItem}
              />
            );
          })}
        </ul>
      )}
    </li>
  );
}
