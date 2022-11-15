import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/userContext";

export const PrivateRoute = ({ checkAdmin }) => {
  const { currentUser } = useUser();

  return currentUser && (!checkAdmin || currentUser.admin) ? (
    <Outlet />
  ) : (
    <Navigate to="/acesso_usuario" replace />
  );
};
