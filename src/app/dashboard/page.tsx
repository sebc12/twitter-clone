"use client";
import { logout } from "@/lib/auth";
import CreatePost from "./CreatePost";
import Posts from "./posts";

export default function Dashboard() {
  const handleLogout = async (e: any) => {
    e.preventDefault();

    await logout();
  };

  return (
    <div className="py-16">
      <div className="flex justify-end m-auto mb-4 pr-16 ">
        <button
          onClick={handleLogout}
          className="border p-2 px-3 rounded-xl hover:bg-red-500 hover:text-white transition duration-300 ease-in-out cursor-pointer"
        >
          Logout
        </button>
      </div>
      <CreatePost />
      <Posts />
    </div>
  );
}
