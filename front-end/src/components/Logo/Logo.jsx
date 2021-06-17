import unicornio from '../../assets/unicornio.png';
import style from './style.module.css';

export default function Logo(props) {
    return(
        <header className={style.header}>
            <img src={unicornio} alt="CURLTA"/>
            <h1>ENCURLTA</h1>
        </header>
    );
}