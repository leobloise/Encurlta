import Url from "../models/Url.js"

export class Rank {


    bestFive(req, res) {
        const url = new Url();
        url.bestFive()
        .then(response => {
            res.status(200)
            .send(
                response
            )
        })
        .catch(err => {
            console.error(err)
            res.status(500)
            .json({
                "msg": "Não foi possível recuperar os 5 mais clicados."
            })
        })
    }

}