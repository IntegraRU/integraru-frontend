import { BiUser, BiHistory, BiMoney, BiDish, BiStar } from "react-icons/bi";
import { GiKnifeFork } from "react-icons/gi";

export const userServiceOptions = [
  {
    name: "Perfil",
    route: "/perfil",
    icon: BiUser,
  },
  {
    name: "Cardápio do Dia",
    route: "/cardapio",
    icon: GiKnifeFork,
  },
  {
    name: "Histórico de Reservas",
    route: "/historico",
    icon: BiHistory,
  },
  {
    name: "Adicionar Crédito",
    route: "/credito",
    icon: BiMoney,
  },
];

export const adminServiceOptions = [
  {
    name: "Perfil",
    route: "/perfil",
    icon: BiUser,
  },
  {
    name: "Cadastrar Cardápio",
    route: "/cardapio",
    icon: BiDish,
  },
  {
    name: "Adicionar Crédito",
    route: "/credito",
    icon: BiMoney,
  },
  {
    name: "Histórico de Avaliações",
    route: "/avaliacoes",
    icon: BiStar,
  },
];
