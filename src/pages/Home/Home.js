import React, { useState } from "react";

import { HiMenu } from "react-icons/hi";
import ServiceCard from "../../components/ServiceCard";
import { adminServiceOptions, userServiceOptions } from "../../util/Options";

import styles from "./Home.module.css";

export default function Home() {
  // TODO: User integration
  const [userData, setUserData] = useState({
    name: "Fulana",
    role: "admin",
  });

  const serviceOptions = userData.role === "admin" ? adminServiceOptions : userServiceOptions;

  return (
    <div className={styles.home__container}>
      <header>
        <span>{`Olá, ${userData.name}!`}</span>
      </header>
      <main>
        <h2>Escolha qualquer uma das opções abaixo</h2>
        <div className={styles.home__navigationContainer}>
          {serviceOptions.map((option) => {
            return (
              <ServiceCard name={option.name} route={option.route}>
                <option.icon size="48px" />
              </ServiceCard>
            );
          })}
        </div>
      </main>
      <div id={styles.home__line}></div>
    </div>
  );
}
