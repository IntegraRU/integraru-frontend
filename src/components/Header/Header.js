import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { slide as Menu } from "react-burger-menu";
import { useUser } from '../../contexts/userContext';
import {ImExit} from 'react-icons/im';

export default function Header() {
  const navigate = useNavigate();
  const { getUserRoutes, performLogout, currentUser } = useUser();

  return (
    <>
      <button className={styles.return} onClick={() => { navigate((currentUser.admin ? '/admin': "") + '/inicio') }}>
        Voltar
      </button>
      <Menu
        burgerButtonClassName={styles.burger__button}
        burgerBarClassName={styles.burger__bars}
        crossClassName={styles.cross}
        crossButtonClassName={styles.cross__button}
        menuClassName={styles.menu}
        morphShapeClassName={styles.morph__shape}
        itemListClassName={styles.item__list}
        itemClassName={styles.item}
        overlayClassName={styles.overlay}
      >
        {getUserRoutes().map(route =>
          <Link key={route.name} to={`/${route.route}`}><route.icon size="2rem" /> {route.name}</Link>)}
        <button className={styles.logout} onClick={performLogout}><ImExit /> Sair</button>
      </Menu>
    </>
  );
}
