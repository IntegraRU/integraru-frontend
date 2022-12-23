import React, { useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import UserAccess from "./pages/UserAccess";
import { serviceRoutes } from "./Routes";
import { UserProvider } from "./contexts/userContext";
import { PrivateRoute } from "./util/Auth";

function App() {
  const buildRoutes = useCallback((type) => {
    return serviceRoutes
      .filter((route) => route.type === type)
      .map((route) => (
        <Route
          key={route.name}
          path={route.route}
          element={React.createElement(route.component, {})}
          exact
        />
      ));
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/acesso_usuario" element={<UserAccess />} exact />
          <Route exact path='/' element={<PrivateRoute />}>
            <Route path="" element={<Navigate to="/acesso_usuario" replace />}/>
            {buildRoutes("user")}
          </Route>
          <Route exact path="/admin" element={<PrivateRoute checkAdmin />}>
            {buildRoutes("admin")}
          </Route>
          {/* TODO: Decidir o que fazer com rotas incorretas
        <Route path="*" element={<Navigate to="/acesso_usuario" replace />}/> */}
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
