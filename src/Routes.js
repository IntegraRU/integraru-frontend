import { BiHome, BiUser } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";

import Home from "./pages/Home";
import ViewMenus from "./pages/ViewMenus";
import ChangeMenu from "./pages/ChangeMenu";
import Profile from "./pages/Profile";
import UserMenus from "./pages/UserMenus";
import Checkout from "./pages/Checkout";

export const serviceRoutes = [
  {
    name: "Página inicial",
    route: "inicio",
    icon: BiHome,
    component: Home,
    type: "user",
  },
  {
    name: "Perfil",
    route: "perfil",
    icon: BiUser,
    component: Profile,
    type: "user",
  },
  {
    name: "Página inicial",
    route: "inicio",
    icon: BiHome,
    component: Home,
    type: "admin",
  },
  {
    name: "Cadastrar Cardápio",
    route: "cardapio/novo",
    icon: GiKnifeFork,
    component: ChangeMenu,
    type: "admin",
  },
  {
    name: "Editar Cardápio",
    route: "cardapio/editar",
    icon: GiKnifeFork,
    component: ChangeMenu,
    type: "admin",
  },
  {
    name: "Visualizar Cardápios",
    route: "cardapio",
    icon: GiKnifeFork,
    component: ViewMenus,
    type: "admin",
  },
  {
    name: "Visualizar Cardápios",
    route: "cardapio",
    icon: GiKnifeFork,
    component: UserMenus,
    type: "user",
  },
  {
    name: "Checkout",
    route: "checkout",
    icon: GiKnifeFork,
    component: Checkout,
    type: "user",
    directAccess: false,
  },
];
