import { useAtom } from "jotai";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authAtom } from "../../store";
import Sidebar from "./Sidebar";

const RequireAuth = () => {
  const [auth] = useAtom(authAtom);
  const location = useLocation();
  const localToken = localStorage.getItem("token");

  return auth?.token || localToken ? (
    <div className="min-h-screen">
      <div className="flex">
        <Sidebar show={true} />
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
