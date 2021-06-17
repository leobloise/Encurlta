import sqlite3 from 'sqlite3'

const db = new sqlite3.Database('db.sqlite');

export default function prepareDatabase() {
    return new Promise((resolve, reject) => {
        
        const createTable = `CREATE TABLE urls (
            urlCode TEXT PRIMARY KEY,
            longUrl TEXT NOT NULL,
            shortUrl TEXT NOT NULL,
            clickCount INTEGER NOT NULL,
            dateCreation INTEGER NOT NULL
        );`
        
        
        db.run(createTable, (res, err) => {
            if(err) {
                reject(err)
            }
            resolve();
        })

    })
}


export {db}

