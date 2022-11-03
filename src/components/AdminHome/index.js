import React, { useState } from "react";
import Cards from "./Cards";
import UserIcon from "../../assets/svgUserIcon.svg";
import StarIcon from "../../assets/star.svg";
import MoneyIcon from "../../assets/moneysvg.svg";
import DishIcon from "../../assets/dish-icon.svg";

import { MainContent, Options } from "./style";

function AdminHome() {
  const [userName, setUserName] = useState("Fulana");
  return (
    <MainContent>
      <h1>{`Olá, ${userName}!`}</h1>
      <h2>Escolha qualquer uma das opções abaixo</h2>
      <Options>
        <Cards text="Perfil" svg={UserIcon} />
        <Cards text={"Cadastro de\n cardápio"} svg={DishIcon} />
      </Options>
      <Options>
        <Cards text={"Adicionar\n crédito"} svg={MoneyIcon} />
        <Cards text={"Histórico de\n Avaliações"} svg={StarIcon} />
      </Options>
    </MainContent>
  );
}

export default AdminHome;
