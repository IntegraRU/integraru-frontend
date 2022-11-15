import ServiceCard from "../../components/ServiceCard";
import {useUser} from "../../contexts/userContext";

import styles from "./Home.module.css";

export default function Home() {

  const { currentUser, getUserRoutes } = useUser();

  return (
    <div className={styles.home__container}>
      <header>
        <span>{`Olá, ${currentUser.name}!`}</span>
      </header>
      <main>
        <h2>Escolha qualquer uma das opções abaixo</h2>
        <div className={styles.home__navigationContainer}>
          {getUserRoutes().map(route => (
            <ServiceCard name={route.name} route={route.route} key={route.route}>
              <route.icon size="48px" />
            </ServiceCard>
          ))}
        </div>
      </main>
    </div>
  );
}
