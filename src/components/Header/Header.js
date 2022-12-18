import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { slide as Menu } from "react-burger-menu";
import { useUser } from '../../contexts/userContext';
import { id } from "date-fns/locale";

export default function Header() {
  const navigate = useNavigate();
  const { getUserRoutes } = useUser();

  return (
    <>
      <button className={styles.return} onClick={() => { navigate(-1) }}>
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
          <Link key={route.name} to={`${route.route}`}><route.icon size="2rem" /> {route.name}</Link>)}
      </Menu>
    </>
  );
}

