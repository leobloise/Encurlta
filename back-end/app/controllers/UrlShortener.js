import Url from '../models/Url.js';


export class UrlShortener {

    short(req, res) {

        const {longUrl} = req.body;

        try {
            const url = new Url(longUrl);
            url.find()
            .then(() => {
                    res
                    .status(200)
                    .json({
                        "status": 200,
                        "shortUrl": url.shortUrl
                    })
            })
            .catch(err => {
                  
                if(err === false) {           
                    res
                    .status(500)
                    .json({
                        "status": 500,
                        "msg": "Erro interno - Por favor, cheque o console."
                    })
                    return;
                }

                url.create()
                .then(() => {
                    res
                    .status(200)
                    .json({
                        "status": 200,
                        "shortUrl": url.shortUrl
                    })
                })
                .catch(err => {
                    console.log(`Erro: ${err}`)
                    res
                    .status(500)
                    .json({
                        "status": 500,
                        "msg": "Erro interno - Por favor, cheque o console."
                    })
                    return;
                })
                    
             })

            
        } catch(e) {
            console.log(`Erro: ${e.message}`);
            res
            .status(400)
            .json({
                status: 400,
                msg: e.message
            })
        }

    } 

}