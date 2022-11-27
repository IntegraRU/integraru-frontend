import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ServiceCard.module.css";

export default function ServiceCard({ children, name, route }) {
  const navigate = useNavigate();
  return (
    <div className={styles.card__container} onClick={() => navigate(route)}>
      <div className={styles.card__icon}>{children}</div>
      <span>{name}</span>
    </div>
  );
}
