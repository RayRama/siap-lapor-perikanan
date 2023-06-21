import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function SidebarItem({
  name,
  route,
  icon,
}: {
  name: string;
  route: string;
  icon: any;
}) {
  const router = useLocation();
  const navigate = useNavigate();

  const colorClass =
    router.pathname === route ? "text-[#3742FA] bg-[#5c4ec90d]" : "text-black";
  return (
    <div onClick={() => navigate(route)}>
      <div
        className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer text-base font-medium hover:bg-gray-100 ${colorClass}`}
      >
        <div className="w-6 h-6 pr-8">{icon}</div>
        <div>{name}</div>
      </div>
    </div>
  );
}
