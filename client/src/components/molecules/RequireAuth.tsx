import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom } from "../../store";
const RequireAuth = () => {
  const [auth] = useAtom(authAtom);
  const location = useLocation();
  return auth?.token ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
