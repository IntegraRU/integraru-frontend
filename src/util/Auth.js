import { Route, Navigate, Outlet } from 'react-router-dom';

// TODO: Auth function
const isAuthenticated = true;

const AdminRoute = () => {
  const isAdmin = true;
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/user_access" replace />;
  }
  return <Outlet />;
};

const UserRoute = () => {
  const isCommon = true;
  if (!isAuthenticated || !isCommon) {
    return <Navigate to="/user_access" replace />;
  }

  return <Outlet />;
};

export { AdminRoute, UserRoute };