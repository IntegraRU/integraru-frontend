import { BiHome, BiUser } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";

import Home from "./pages/Home";
import Menus from "./pages/Menus";
import ChangeMenu from "./pages/ChangeMenu";
import Profile from "./pages/Profile";
import History from "./pages/History";
import Checkout from "./pages/Checkout";

export const serviceRoutes = [
  {
    name: "Página inicial",
    route: "inicio",
    icon: BiHome,
    component: Home,
    type: "user",
    directAccess: true,
  },
  {
    name: "Perfil",
    route: "perfil",
    icon: BiUser,
    component: Profile,
    type: "user",
    directAccess: true,
  },
  {
    name: "Página inicial",
    route: "inicio",
    icon: BiHome,
    component: Home,
    type: "admin",
    directAccess: true,
  },
  {
    name: "Cadastrar Cardápio",
    route: "cardapio/novo",
    icon: GiKnifeFork,
    component: ChangeMenu,
    type: "admin",
    directAccess: false,
  },
  {
    name: "Editar Cardápio",
    route: "cardapio/editar",
    icon: GiKnifeFork,
    component: ChangeMenu,
    type: "admin",
    directAccess: false,
  },
  {
    name: "Cardápios",
    route: "cardapio",
    icon: GiKnifeFork,
    component: Menus,
    type: "admin",
    directAccess: true,
  },
  {
    name: "Cardápios",
    route: "cardapio",
    icon: GiKnifeFork,
    component: Menus,
    type: "user",
    directAccess: true,
  },
  {
    name: "Checkout",
    route: "checkout",
    icon: GiKnifeFork,
    component: Checkout,
    type: "user",
    directAccess: false,
  },
  {
    name: "Visualizar Histórico",
    route: "historico",
    icon: GiKnifeFork,
    component: History,
    type: 'user',
    directAccess: true
  }
];
