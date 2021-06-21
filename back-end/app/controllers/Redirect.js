import Url from "../models/Url.js"

export class Redirect {

    async redirect(req, res) {
        const {code} = req.params

        const url = new Url(null, code);

        return url.find()
        .then(() => {
            url.update()
            .then(() => {
                res.redirect(url.longUrl)
            })
            .catch(err => {
                res.status(500)
                .send()
                console.log(err)
            })
            
        })
        .catch(err => {

            if(err === undefined)
                res.status(404)
                .send()
            if(err === false) {
                res.status(500)
                .send()
                console.log(err)
            }
                
        })
    } 

}