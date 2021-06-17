import { Link } from "react-router-dom"
import style from './style.module.css'

export default function Menu(props) {

    return(
        <nav className={style.menuNav}>
            <ul>
            <li>
                <Link id={props.activeHome ? style.active: ""} to="/"> Home </Link>
            </li>
            <li>
                <Link id={props.activeRank ? style.active: ""}to="/rank"> Rank</Link>
            </li>
            </ul>
        </nav>
    )

}