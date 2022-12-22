import ServiceCard from "../../components/ServiceCard";
import {useUser} from "../../contexts/userContext";
import { GiMoneyStack } from 'react-icons/gi';

import styles from "./Home.module.css";

export default function Home() {

  const { currentUser, getUserRoutes } = useUser();

  return (
    <div className={styles.home__container}>
      <header>
        <h1>{`Olá, ${currentUser.nome}!`}</h1>
        {currentUser.admin ? 
          <></> :
          <span>
            <GiMoneyStack /> Saldo Atual: R$ {currentUser.credito || '0,00'}
          </span>
        }
      </header>
      <main>
        <h2>Escolha qualquer uma das opções abaixo</h2>
        <div className={styles.home__navigationContainer}>
          {getUserRoutes().filter(route => !route.route.includes("inicio")).map(route => (
            <ServiceCard name={route.name} route={route.route} key={route.route}>
              <route.icon size="48px" />
            </ServiceCard>
          ))}
        </div>
      </main>
    </div>
  );
}
