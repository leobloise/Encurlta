import style from './style.module.css'

export default function RankItem({
    longUrl,
    shortUrl,
    clickCount,
    index
}) {

    let longUrlLink = longUrl;

    if(longUrl.length >= 25) {
        longUrlLink = longUrl.substr(0, 20) + '...';
    }

    return(
        <li className={style.rankitem}>
            <p> {index} </p>
            <a href={`http://${shortUrl}`} target="_blank" rel="noreferrer">{shortUrl}</a> 
            <a href={`${longUrl}`} rel="noreferrer" target="_blank">{longUrlLink} </a>
            <p> {clickCount} </p>
        </li>
    );
}