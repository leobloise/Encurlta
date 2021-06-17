import Url from "../../models/Url.js";

export default function rankRoute(app) {

    const url = new Url();

    app.get('/bestFiveUrls', (req, res) => {
        url.bestFive()
        .then(response => {
            res.status(200)
            .send(
                response
            )
        })
        .catch(err => console.log(err))
    })

    return app

}