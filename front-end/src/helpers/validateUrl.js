export default function validateUrl(url) {

    if(url.length < 10) {
        return {
            valido: false,
            msg: "A URL deve ter mais do que 10 caracteres"
        }
    }

    if(url.substr(0, 8) !== "https://" && url.substr(0, 7) !== "http://") {
        return {
            valido: false,
            msg: "A URL deve ter o protocolo https ou http"
        }
    }

    return {
        valido: true,
        msg: "Deu tudo certo :)",
        url: url
    }
}