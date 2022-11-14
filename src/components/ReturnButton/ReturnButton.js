import { useNavigate } from "react-router-dom";
import styles from "./ReturnButton.module.css";

export default function ReturnButton() {
    const navigate = useNavigate();

    return (
        <button className={styles.return} onClick={()=>{navigate(-1)}}>
            Voltar
        </button>
    );
}
