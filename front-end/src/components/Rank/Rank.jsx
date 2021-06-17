import Logo from '../Logo/Logo.jsx'
import RankItem from '../RankItem/RankItem.jsx';
import style from './style.module.css'
import getRank from '../../helpers/getRank.js';
import { useEffect, useState } from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';

export default function Rank({ativarMenu}) {

    const [links, setLinks] = useState([]);

    useEffect(() => {
        ativarMenu()
    }, [])

    function atualizaRank(e = null) {
        
        if(e !== null)
            e.preventDefault();
        
        getRank()
        .then(res => {
            setLinks((res))
        })

    }


    useEffect(() => {
        atualizaRank()
    }, [])    
    
    return(
        <>
            <Logo></Logo>
            <section className={style.section__rank}>
            <span> Mais Clicadas!</span>
            <RefreshIcon color='action' fontSize='large' onClick={atualizaRank} className={style.refreshIcon}></RefreshIcon>
                <ul>
                        
                    {links.map((linkF, index) => {
                        return (
                            <RankItem key={index} longUrl={linkF.longUrl}
                            shortUrl={linkF.shortUrl}
                            clickCount={linkF.clickCount}
                            index={index+1}></RankItem>
                        )
                    })}
                </ul>
            </section>
        </>
    );  

}