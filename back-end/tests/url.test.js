import Url from "../app/models/Url";

function createURL(URL) {
    const url = new Url(URL);
    return url
}



test('SameOriginURL', () => {

    const wrongUrls = [
        "localhost",
        "http://localhost",
        "https://localhost",
        "localhost:5000",
        "localhost:3000"
    ]

    wrongUrls.forEach(wrongUrl => {
        expect(() => createURL(wrongUrl)).toThrow("Não é possível encurtar links que tenham como domínio esse site")
    })

})

test("DifferentOriginURL", () => {

    const rightUrls = [
        "https://www.google.com.br",
        "https://www.facebook.com.br",
        "https://www.twitter.com.br",
        "https://www.github.com.br",
        "https://www.gov.br/pt-br"
    ]

    rightUrls.forEach(rightUrl => {
        expect(() => createURL(rightUrl)).toBeDefined()
    })

})

test("InalidWebURI", () => {
    
    const wrongUrls = [
        "ftp://www.example.com.br",
        "file://ehnois.org",
        "fsdjaklfdhasjdfas",
        "asljdlkasjdas.com.br",
        "http://flçdasfoldsa",
        "https://",
        "http://"
    ]

    wrongUrls.forEach(wrongUrl => {
        expect(() => createURL(wrongUrl)).toThrow(`${wrongUrl} - não é válida`)
    })

})

test("ValidWebURI", () => {
    
    const wrongUrls = [
        "https://regexr.com/",
        "https://stackoverflow.com/questions/1547899/which-characters-make-a-url-invalid",
        "https://bl.ocks.org/rstacruz/511f43265de4939f6ca729a3df7b001c",
        "https://jestjs.io/pt-BR/docs/using-matchers",
        "https://www.geekhunter.com.br/candidates/register"
    ]

    wrongUrls.forEach(wrongUrl => {
        expect(() => createURL(wrongUrl)).toBeDefined()
    })

})