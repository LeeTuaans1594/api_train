import { useEffect, useState, useContext } from "react";
import { getCurrentUser, type UserInfo } from "../../api/getAPI";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CircleUserRound, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/login");
  };

  useEffect(() => {
    getCurrentUser()
      .then((res: UserInfo) => {
        setCurrentUser(res);
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });
  }, []);

  const navLinks = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Thiết bị",
      link: "/data",
    },
    {
      name: "Người dùng",
      link: "/user",
    },
  ];

  return (
    <div className="flex items-center justify-between bg-taupe-900 px-8 py-5 border-b border-taupe-600">
      <div>
        <h1 className="text-xl font-bold hover:text-taupe-100  hover:cursor-pointer">
          Hello World
        </h1>
      </div>

      <nav>
        <ul className="flex gap-12 text-xl font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.link}
              className={`${pathname === link.link && "text-taupe-100"} transition duration-300 hover:text-taupe-100 border-b-2 border-transparent hover:border-taupe-100`}
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <p className="text-l font-medium">
          Welcome {currentUser?.username || "Guest"}
        </p>

        <div className="flex gap-2 items-center relative">
          <CircleUserRound size={28} />

          <ChevronDown
            size={20}
            onClick={() => setIsOpen(!isOpen)}
            className={`${!isOpen && "rotate-x-180"} cursor-pointer transation duration-200`}
          />

          <div
            className={`${isOpen ? `hidden` : `block`} p-4 bg-taupe-900 w-fit absolute top-14 flex items-center right-0`}
          >
            <button onClick={handleLogout} className=" cursor-pointer">
              <p className="whitespace-nowrap hover:text-white font-medium">
                Đăng xuất
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
