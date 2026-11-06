import { Phone, Mail } from "lucide-react";
import { getDetailUser, type ListUser } from "../../api/getAPI";
interface UserCardProps {
  data: ListUser;
  setInfoUser: (user: ListUser) => void;
}

export default function UserCard({ data, setInfoUser }: UserCardProps) {
  const { id, email, name, phone } = data;

  function getInitials(fullName: string) {
    // Loại bỏ khoảng trắng thừa ở đầu/cuối và tách thành mảng các từ
    const words = fullName.trim().split(/\s+/);

    if (words.length < 1) return ""; // Trường hợp chỉ có 1 từ

    // Tên là phần tử cuối cùng
    const ten = words[words.length - 1];
    const firstLetterTen = ten.charAt(0).toUpperCase();

    if (words.length < 2) return firstLetterTen; // Trường hợp chỉ có 1 từ

    // Tên đệm là phần tử đứng trước tên (lấy chữ đầu của từ này)
    const tenDem = words[words.length - 2];

    const firstLetterTenDem = tenDem.charAt(0).toUpperCase();

    return firstLetterTenDem + firstLetterTen;
  }

  function handleViewDetail(id: number) {
    getDetailUser(id)
      .then((res: ListUser) => {
        setInfoUser(res);
      })
      .catch();

    setInfoUser(data);
  }

  return (
    <div
      onClick={() => {
        handleViewDetail(id);
      }}
      className="flex flex-col p-4 bg-taupe-800 border border-taupe-600 rounded-3xl gap-4 hover:bg-taupe-600 cursor-pointer"
    >
      <div className="flex flex-row justify-between items-center border-b pb-5 border-b-taupe-600">
        <div className="flex flex-row items-center gap-3">
          <p className="p-4 bg-taupe-400 w-fit rounded-2xl">
            {getInitials(name)}
          </p>
          <p className="text-xl font-semibold">{name}</p>
        </div>
        <p className="h-fit p-2 bg-taupe-700 items-center rounded-2xl">#{id}</p>
      </div>

      <span className="flex flex-row items-center gap-2 px-2 text-sm">
        <Mail size={15} />
        <p>{email}</p>
      </span>
      <span className="flex flex-row items-center gap-2 px-2 text-sm">
        <Phone size={15} />
        <p>{!phone ? "Chưa đăng ký số điện thoại" : phone}</p>
      </span>
    </div>
  );
}
