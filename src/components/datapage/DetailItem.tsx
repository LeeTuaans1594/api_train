import { type Devices } from "../../api/getAPI";

interface DetailItemProps {
  selectedItem: Devices | undefined;
}

export default function DetailItem({ selectedItem }: DetailItemProps) {
  const key = [
    {
      title: "Profile",
      key: selectedItem?.entity_profile,
    },
    {
      title: "Type",
      key: selectedItem?.entity_type,
    },
    {
      title: "Level",
      key: selectedItem?.entity_level,
    },
    {
      title: "Children",
      key: selectedItem?.children.length,
    },
  ];

  const table = [{}];

  return (
    <main className="flex flex-col p-8 gap-8 justify-between flex-1 rounded-md">
      <div className="bg-taupe-700 p-3 rounded-xl">
        {selectedItem?.location}
      </div>
      <div className="flex justify-between items-center p-3 bg-taupe-700 rounded-xl">
        <p className="text-3xl font-semibold">{selectedItem?.name}</p>
        <p>ID: {selectedItem?.id}</p>
      </div>
      <div className="flex justify-between flex-1 max-h-fit gap-10">
        {key.map((key) => (
          <div className="flex flex-col bg-taupe-700 flex-1 items-center p-4 rounded-md">
            <p>{key.title}</p>
            <p>{key.key}</p>
          </div>
        ))}
      </div>
      <div className="flex-1 bg-taupe-700 rounded-md grid grid-cols-5 p-3">
        <p className="text-center">A</p>
        <p className="text-center">A</p>
        <p className="text-center">A</p>
        <p className="text-center">A</p>
        <p className="text-center">A</p>
      </div>
    </main>
  );
}
