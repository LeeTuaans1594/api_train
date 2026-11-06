import { createContext } from "react";

interface AuthContextType {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);
