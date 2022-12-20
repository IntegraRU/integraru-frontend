import { BiHome, BiUser } from "react-icons/bi";
import { GiKnifeFork, GiMoneyStack } from "react-icons/gi";
import { AiOutlineStar } from 'react-icons/ai';

import Home from "./pages/Home";
import Menus from "./pages/Menus";
import ChangeMenu from "./pages/ChangeMenu";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import AddCredit from "./pages/AddCredit";
import HistoryRate from "./pages/HistoryRate";

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
    name: "Página inicial",
    route: "inicio",
    icon: BiHome,
    component: Home,
    type: "admin",
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
    name: "Perfil",
    route: "perfil",
    icon: BiUser,
    component: Profile,
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
    name: "Adicionar Crédito",
    route: "credito",
    icon: GiMoneyStack,
    component: AddCredit,
    type: "admin",
    directAccess: true,
  },
  {
    name: "Histórico de Avaliações",
    route: "avaliacoes",
    icon: AiOutlineStar,
    component: HistoryRate,
    type: "admin",
    directAccess: true,
  }
];
