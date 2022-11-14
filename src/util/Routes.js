import { BiHome, BiUser } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";

import Home from "../pages/Home";
import ViewMenus from "../pages/ViewMenus";
import ChangeMenu from "../pages/ChangeMenu";
import Profile from "../pages/Profile";
import { UserRoute, AdminRoute } from "./Auth";

export const serviceRoutes = [
  {
    name: "Página inicial",
    route: "inicio",
    icon: BiHome,
    component: Home,
    type: UserRoute,
  },
  {
    name: "Perfil",
    route: "perfil",
    icon: BiUser,
    component: Profile,
    type: UserRoute,
  },
  {
    name: "Página inicial",
    route: "inicio",
    icon: BiHome,
    component: Home,
    type: AdminRoute,
  },
  {
    name: "Cadastrar Cardápio",
    route: "cardapio/novo",
    icon: GiKnifeFork,
    component: ChangeMenu,
    type: AdminRoute,
  },
  {
    name: "Editar Cardápio",
    route: "cardapio/editar",
    icon: GiKnifeFork,
    component: ChangeMenu,
    type: AdminRoute,
  },
  {
    name: "Visualizar Cardápios",
    route: "cardapio",
    icon: GiKnifeFork,
    component: ViewMenus,
    type: AdminRoute,
  }
];
