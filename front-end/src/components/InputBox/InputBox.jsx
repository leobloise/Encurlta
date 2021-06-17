import { useState } from 'react';
import style from './style.module.css';
import shortUrl from '../../helpers/ShortUrl';
import Url from '../../model/Url';


export default function InputBox(props) {
    
    const [url,setUrl] = useState("");

    function handleMudancaInput(event) {

        event.preventDefault();

        let tempUrl = event.target.value;

        tempUrl = tempUrl.replace(/\s/, "");

        return setUrl(tempUrl);
    }

    function send(e) {

        e.preventDefault();
        
        const input = document.querySelector(`.${style.section__input} form input[type="text"]`)
        
        const label = document.querySelector(`.${style.section__input} form label`);
        
        const urlValida = Url(url);

        if(!urlValida.valido) {
            label.textContent = urlValida.msg;
            input.classList.add(`${style.inputerror}`)
            return;
        } 
        
        label.textContent = "";
        input.classList.remove(`${style.inputerror}`)

        const timeoutid = setTimeout(() => {
            label.textContent = "Não foi possível encurtar o link. Cheque sua internet "
            input.value = url;
        }, 60000)

        shortUrl(url)
        .then(response => {

            clearTimeout(timeoutid);

            setTimeout(() => {

                if(response.status === 200) {
                    label.textContent = "ENCURTADO!"
                    input.value = response.shortUrl;
                    input.disabled = true;
                    input.classList.add(`${style.inputright}`)
                    return;
                }

                if(response.status === 400) {
                    label.textContent = response.msg
                    input.value = url;
                    return;
                }

                label.textContent = "Não foi possível encurtar o link "
                input.value = url;

                console.error(response);
                
            }, 2000)
           
        })
        .catch(err => {
            label.textContent = "Não foi possível encurtar o link "
            input.value = url;

            console.error(err);
        })

        label.textContent = "Carregando...";

    }

    return (
        <section className={style.section__input}>
            <form onSubmit={send}>
                <label htmlFor="inputURL"></label>
                <input type="text" id="inputURL" placeholder="https://" value={url} onChange={handleMudancaInput}/>
                <input type="submit" value="Encurtar"/>
            </form>
        </section>
    );
}