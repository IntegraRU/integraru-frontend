import React, { useState } from "react";

import ServiceCard from "../../components/ServiceCard";
import { getUserType } from "../../util/Auth";
import { serviceRoutes } from "../../util/Routes";

import styles from "./Home.module.css";

export default function Home() {
  // TODO: User integration
  const [userData, setUserData] = useState({
    name: "Fulana",
  });

  return (
    <div className={styles.home__container}>
      <header>
        <span>{`Olá, ${userData.name}!`}</span>
      </header>
      <main>
        <h2>Escolha qualquer uma das opções abaixo</h2>
        <div className={styles.home__navigationContainer}>
          {serviceRoutes.map((option) => {
            return option.type === getUserType() ? (
              <ServiceCard name={option.name} route={option.route} key={option.route}>
                <option.icon size="48px" />
              </ServiceCard>
            ) : null;
          })}
        </div>
      </main>
    </div>
  );
}
