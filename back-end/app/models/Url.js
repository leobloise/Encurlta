import shortid from 'shortid';
import validUrl from 'valid-url';
import UrlRepository from '../../config/UrlRepository.js';

export default class Url {
    
    constructor(longUrl = null, urlCode = null, shorturl = null, clickCount = null, dateCreation = null) {
        this.urlCode = urlCode;
        this.shortUrl = shorturl
        this.clickCount = clickCount;
        this.dateCreation = dateCreation;
        this.baseUrl = "localhost:5000";
        this.longUrl = this._checkUrl(longUrl);
        this.urlRepo = new UrlRepository('urls')
    }
    /**
     * 
     * @param {string} url 
     * @returns string | null
     */
    _cleanUrl(url) {

        if(url === null)
            return url;

        return url.replace(/\s/, "")
        .replace(/,com/, ".com")
        .replace(/,br/, ".br")

    }

    _checkUrl(url) {

        url = this._cleanUrl(url)

        if(url === null) {
            return url;
        }

        let sameOrigin = new RegExp("localhost") .test(url);

        if(sameOrigin) {
            throw new Error("Não é possível encurtar links que tenham como domínio esse site")
        }

        if(validUrl.isWebUri(url)) {
            return url;
        }

        throw new Error(`${url} - não é válida`)

    }

    bestFive() {

        return new Promise((resolve, reject) => {

            this.urlRepo.getAll(
                ["longUrl", "shortUrl", "clickCount"], ["ORDER BY clickCount DESC LIMIT 5"]
            )
            .then(rows => resolve(rows))
            .catch(err => reject(err))

        })

    }

    create() {

        return new Promise((resolve, reject) => {

            this.urlCode = shortid();
            this.shortUrl = `${this.baseUrl}/${this.urlCode}`;
            this.clickCount = 0;
            this.dateCreation =  new Date().getTime();

            this.urlRepo.createUrl(this)
            .then(res => resolve(res))
            .catch(err => reject(err))

        })

    }

    update() {
        return new Promise((resolve, reject) => {

            this.clickCount++;

            this.urlRepo.update('clickCount', this.clickCount, this.urlCode)
            .then(res => resolve(res))
            .catch(err => {
                console.log(err)
                reject(err)
            })

        })
    }

    find() {
        return new Promise((resolve, reject) => {
            
            if( (this.longUrl === null && this.urlCode === null) || (this.longUrl != null && this.urlCode != null) ) {
                reject("É preciso de uma e somente uma URL longa ou código de URL para encontrá-la")
                return;
            }

            let keyToSearch = this.longUrl || this.urlCode;

            let keyName = (this.longUrl != null)?"longUrl":"urlCode";

            this.urlRepo.getOne(
                ['*'],
                keyName,
                keyToSearch
            )
            .then(row => {
                if(row) {
                    this.longUrl = row.longUrl
                    this.clickCount = row.clickCount;
                    this.urlCode = row.urlCode;
                    this.shortUrl = row.shortUrl;
                    this.dateCreation = row.dateCreation;
                    resolve(row)
                    return;
                }
                reject(row)
            })
            .catch(err => {
                console.error(err)
                reject(false)
            })
        })
    }


}