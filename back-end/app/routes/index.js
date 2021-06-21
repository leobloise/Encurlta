import urlShortenerRoute from "./urlShortener/urlShortener.js";
import rankRoute from "./rank/rankRoute.js";
import { Redirect } from "../controllers/Redirect.js";

const redirectController = new Redirect();

export default function routes(app) {

    app = rankRoute(app)

    app.get("/:code", redirectController.redirect)

    app = urlShortenerRoute(app)

    return app;

}