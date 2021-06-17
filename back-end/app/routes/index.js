import urlShortenerRoute from "./urlShortener/urlShortener.js";
import Url from "../models/Url.js";
import rankRoute from "./rank/rankRoute.js";


export default function routes(app) {

    app = rankRoute(app)

    app.get("/:code", (req, res) => {

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
 
    })

    app = urlShortenerRoute(app)

    return app;

}