import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import DataPage from "./pages/DataPage";
import HomePage from "./pages/HomePage";
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import { AuthContext } from "./context/AuthContext";
import UserPage from "./pages/UserPage";

export default function App() {
  const [isLogin, setIsLogin] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      <BrowserRouter>
        <Routes>
          {!isLogin ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="*" element={<LoginPage />} />
            </>
          ) : (
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/data" element={<DataPage />} />
              <Route path="/user" element={<UserPage />} />
            </Route>
          )}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}
