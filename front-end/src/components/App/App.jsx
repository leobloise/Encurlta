import { useState } from "react";
import Home from '../Home/Home.jsx';
import Rank from '../Rank/Rank.jsx';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import style from '../../assets/app.module.css';
import Menu from '../Menu/Menu.jsx'

export default function App(props) {

    const [activeHome, setActiveHome] = useState(true);
    const [activeRank, setActiveRank] = useState(false);

    function activeHomeAlone() {
        setActiveHome(true)
        setActiveRank(false);
    }

    function activeRankAlone() {
        setActiveHome(false)
        setActiveRank(true);
    }

    return(
        <main className={style.corpo_principal}>
        <BrowserRouter>
            <Menu activeHome={activeHome} activeRank={activeRank}></Menu>
            <Switch>
            <Route exact path="/">
                <Home ativarMenu={activeHomeAlone} />
            </Route>
            <Route exact path="/rank">
                <Rank ativarMenu={activeRankAlone}></Rank>
            </Route>
            </Switch>
        </BrowserRouter>
        </main>
    )

}