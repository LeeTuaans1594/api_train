import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginFailed, setLoginFailed] = useState<string>("");
  const navigate = useNavigate();
  const { setIsLogin } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://172.26.2.14/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          fcm_token: "string",
        }),
      });
      console.log("hello");
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setIsLogin(true);
        navigate("/");
      } else {
        console.log("hello");
        throw new Error(data.detail || "Login failed");
      }
    } catch {
      console.log("hello");
      setLoginFailed("Tài khoản hoặc mật khẩu không chính xác");
    }
  };
  return (
    <div className="flex min-h-screen justify-center items-center bg-taupe-800 text-taupe-300">
      <div className="flex flex-col bg-taupe-500 p-8 rounded-2xl gap-12 min-w-75 max-w-100 min-h-95 w-full">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded-md text-taupe-800 bg-taupe-300"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md text-taupe-800 bg-taupe-300"
          />
          <div>
            <p className="text-red-700 font-medium">{loginFailed}</p>
          </div>
          <button
            type="submit"
            className="bg-taupe-900 text-taupe-100 p-2 rounded-md hover:bg-taupe-700 transition duration-300 cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
