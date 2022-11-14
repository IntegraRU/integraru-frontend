import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import UserAccess from "./pages/UserAccess";
import ChangeMenu from "./pages/ChangeMenu";
import { AdminRoute, UserRoute } from "./util/Auth";
import { serviceRoutes } from "./util/Routes";

const mapperOptions = (type) => {
  serviceRoutes.map((option) => {
    return option.type === type ? (
      <Route key={option.name} path={option.route} element={option.component} />
    ) : null;
  });
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/acesso_usuario" element={<UserAccess />} />
        <Route path="/" element={<UserRoute />}>
          <Route path="inicio" element={<Home type={UserRoute} />} />
          {mapperOptions(UserRoute)}
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="inicio" element={<Home type={AdminRoute} />} />
          <Route path="cardapio/novo" element={<ChangeMenu />} />
          <Route path="cardapio/editar" element={<ChangeMenu />} />
          {mapperOptions(AdminRoute)}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
