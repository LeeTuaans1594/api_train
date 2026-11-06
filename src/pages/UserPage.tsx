import { getListUser, type DataUser, type ListUser } from "../api/getAPI";
import UserCard from "../components/userpage/UserCard";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function UserPage() {
  const [dataPage, setDataPage] = useState<DataUser | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [keyword, setKeyword] = useState<string>("");
  const [infoUser, setInfoUser] = useState<ListUser | undefined>(undefined);

  useEffect(() => {
    getListUser(page, keyword)
      .then((res: DataUser) => {
        setDataPage(res);
      })
      .catch();
  }, [page, keyword]);

  const detailKey = [
    { title: "Birthday", key: "15/09/2004" },
    { title: "Email", key: infoUser?.email },
    {
      title: "Phone Number",
      key: infoUser?.phone ?? "Chưa đăng ký số điện thoại",
    },
    {
      title: "Address",
      key: "14 Tran Tu Binh",
    },
    {
      title: "Position",
      key: "Tổng giám đốc công ty",
    },
  ];

  return (
    <section className="relative flex flex-col bg-taupe-700 h-screen my-6 mx-15 rounded-3xl p-8 gap-8 ">
      <div className="flex justify-between gap-4 items-center w-full">
        <form className="flex flex-row py-1 gap-4">
          <input
            className="bg-taupe-300 rounded-md p-2 text-taupe-800 w-90"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setPage(1);
            }}
            placeholder="Tìm kiếm theo tên"
          />

          <button
            type="button"
            onClick={() => {
              setKeyword("");
              setPage(1);
            }}
            className={
              keyword.length == 0
                ? `hidden`
                : ` bg-taupe-800 rounded-full p-2 px-3 cursor-pointer hover:bg-taupe-600 disabled:cursor-not-allowed disabled:bg-taupe-400`
            }
          >
            <X size="20" />
          </button>
        </form>

        <div className="flex flex-row justify-end items-center flex-1 gap-4 w-fit">
          <button
            disabled={page <= 1}
            onClick={() => {
              setPage(page - 1);
            }}
            className="bg-taupe-800 whitespace-nowrap rounded-3xl p-3 w-30 cursor-pointer hover:bg-taupe-600 disabled:cursor-not-allowed disabled:bg-taupe-400"
          >
            Trang trước
          </button>
          <p>
            {page}/{dataPage?.total_pages}
          </p>
          <button
            disabled={!dataPage?.has_next}
            onClick={() => {
              setPage(page + 1);
            }}
            className="bg-taupe-800 whitespace-nowrap rounded-3xl p-3 w-30 cursor-pointer hover:bg-taupe-600 disabled:cursor-not-allowed disabled:bg-taupe-400"
          >
            Trang Sau
          </button>
        </div>
      </div>

      <div className=" grid grid-cols-4 grid-rows-3 gap-10 h-full">
        {dataPage?.data?.map((item) => {
          return <UserCard data={item} setInfoUser={setInfoUser} />;
        })}
      </div>

      <div
        onClick={() => {
          setInfoUser(undefined);
        }}
        className={
          infoUser
            ? `absolute p-4 backdrop-blur-md bg-transparent w-full h-full top-0 left-0 rounded-3xl`
            : `hidden`
        }
      >
        <div className="flex flex-col absolute p-8 py-8 gap-6 pb-12 bg-taupe-600 top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2 h-fit w-1/4 rounded-3xl">
          <div className="flex flex-col">
            <button
              onClick={() => {
                setInfoUser(undefined);
              }}
              className="flex justify-end cursor-pointer hover:text-taupe-200"
            >
              <X />
            </button>
            <p className="text-2xl font-bold w-full text-center">
              {infoUser?.name}
            </p>
          </div>

          {detailKey.map((item) => {
            return (
              <span className="flex flex-col gap-2">
                <p className="font-medium">{item.title}</p>
                <p className="bg-taupe-700 px-3 py-2 rounded-xl">{item.key}</p>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
