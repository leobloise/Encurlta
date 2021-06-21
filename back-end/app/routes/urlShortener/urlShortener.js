import { UrlShortener } from '../../controllers/UrlShortener.js';

const urlShortener = new UrlShortener();

export default function urlShortenerRoute(app) {

    app.post('/shortUrl', urlShortener.short)

    return app;

}