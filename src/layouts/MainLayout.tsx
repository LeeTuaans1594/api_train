import { Outlet } from "react-router-dom";
import Navbar from "../components/layout/Navbar";

export default function MainLayout() {
  return (
    <div className="flex h-screen flex-col bg-taupe-800 text-taupe-300">
      <Navbar />
      <Outlet />
    </div>
  );
}
