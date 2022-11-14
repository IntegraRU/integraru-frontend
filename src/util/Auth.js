import { Route, Navigate, Outlet } from 'react-router-dom';

// TODO: Auth function
const isAuthenticated = true;

const AdminRoute = () => {
  const isAdmin = true;
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/acesso_usuario" replace />;
  }
  return <Outlet />;
};

const UserRoute = () => {
  const isCommon = true;
  if (!isAuthenticated || !isCommon) {
    return <Navigate to="/acesso_usuario" replace />;
  }

  return <Outlet />;
};

const getUserType = () => {
  return AdminRoute;
}

export { AdminRoute, UserRoute, getUserType };