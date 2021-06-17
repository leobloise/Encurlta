export default function shortUrl(url) {      

    return new Promise((resolve, reject) => {

        let headers = new Headers();
        headers.set('Content-Type', 'application/json');

        fetch('http://localhost:5000/shortUrl', {
            method: "POST",
            body: `{
                "longUrl": "${url}"
            }`,
            headers: headers,
        })
        .then(data => {
            data.json()
            .then(res =>{
                resolve(res)
        })
        .catch(err => {
            reject(err)
            })
        })
    
    })

    
}