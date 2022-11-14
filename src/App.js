import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserAccess from "./pages/UserAccess";
import { AdminRoute, UserRoute } from "./util/Auth";
import { serviceRoutes } from "./util/Routes";

const buildRoutes = (type) => {
  return serviceRoutes.map((route) => {
    return route.type === type ? (
      <Route key={route.name} path={route.route} element={React.createElement(route.component, {})} exact />
    ) : null;
  });
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/acesso_usuario" element={<UserAccess />} />
        <Route path="/" element={<UserRoute />}>
          {buildRoutes(UserRoute)}
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          {buildRoutes(AdminRoute)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
