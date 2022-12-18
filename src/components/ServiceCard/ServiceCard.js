import React from "react";
import { Link } from "react-router-dom";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ children, name, route }) {
  return (
    <Link className={styles.card__container} to={`${route}`} >
      <div className={styles.card__icon}>{children}</div>
      <span>{name}</span>
    </Link>
  );
}
