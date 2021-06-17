export default function getRank() {

    return new Promise((resolve, reject) => {
        fetch("http://localhost:5000/bestFiveUrls")
        .then(res => {
            res.json().then(response => {
                resolve(response)
            })
        })
        .catch(err => {
            console.log(err)
            reject(err)
        })
    })

    

}