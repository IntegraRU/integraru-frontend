import { React } from "react";

import { BiUser, BiHistory, BiStar } from "react-icons/bi";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { GiKnifeFork } from "react-icons/gi";

import ViewMenus from "../pages/ViewMenus";
import { UserRoute, AdminRoute } from "./Auth";

export const serviceRoutes = [
  {
    name: "Visualizar Perfil",
    route: "perfil",
    icon: BiUser,
    component: null,
    type: UserRoute,
  },
  {
    name: "Cardápio do Dia",
    route: "menu",
    icon: GiKnifeFork,
    component: null,
    type: UserRoute,
  },
  {
    name: "Histórico de Reservas",
    route: "historico",
    icon: BiHistory,
    component: null,
    type: UserRoute,
  },
  {
    name: "Acessar Carteira",
    route: "carteira",
    icon: HiOutlineBanknotes,
    component: null,
    type: UserRoute,
  },
  {
    name: "Cadastrar Cardápio",
    route: "cardapio",
    icon: GiKnifeFork,
    component: <ViewMenus />,
    type: AdminRoute,
  },
  {
    name: "Adicionar Crédito",
    route: "creditos",
    icon: HiOutlineBanknotes,
    component: null,
    type: AdminRoute,
  },
  {
    name: "Histórico de Avaliações",
    route: "avaliacoes",
    icon: BiStar,
    component: null,
    type: AdminRoute,
  },
];
