import styles from './Home.module.css';
import { Hello } from '../../components';

export default function Home(){

    return(
        <div className={styles.home}>
           <Hello />
        </div>
    );
}