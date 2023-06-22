import { useAtom } from "jotai";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authAtom } from "../../store";
import Sidebar from "./Sidebar";
import { useState } from "react";
import MenubarMobile from "./MenubarMobile";

const RequireAuth = () => {
  const [auth] = useAtom(authAtom);
  const [showSidebar, setShowSidebar] = useState(false); // [1
  const location = useLocation();
  const localToken = localStorage.getItem("token");

  return auth?.token || localToken ? (
    <div className="min-h-screen">
      <div className="flex">
        <MenubarMobile setter={setShowSidebar} />
        <Sidebar show={showSidebar} setter={setShowSidebar} />
        <div className="flex flex-col flex-grow w-screen md:w-full min-h-screen bg-[#E4F6FF]">
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
