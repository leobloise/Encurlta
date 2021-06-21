import { Rank } from "../../controllers/Rank.js"

const rankController = new Rank()

export default function rankRoute(app) {

    app.get('/bestFiveUrls', rankController.bestFive)

    return app

}