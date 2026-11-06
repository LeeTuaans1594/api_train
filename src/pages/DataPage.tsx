import Sidebar from "../components/datapage/Sidebar";
import { useEffect, useState } from "react";
import { getDevices, type Devices } from "../api/getAPI";
import DetailItem from "../components/datapage/DetailItem";
export default function DataPage() {
  const [devices, setDevices] = useState<Devices[] | undefined>(undefined);
  const [keyword, setKeyword] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<Devices | undefined>(
    undefined,
  );

  useEffect(() => {
    getDevices(keyword)
      .then((res: Devices[]) => {
        setDevices(res);
      })
      .catch();
  }, [keyword]);

  return (
    <section className="flex h-screen min-h-0">
      <Sidebar
        devices={devices}
        setKeyword={setKeyword}
        selectedId={selectedItem?.id}
        setSelectedItem={setSelectedItem}
      />
      <DetailItem selectedItem={selectedItem} />
    </section>
  );
}
