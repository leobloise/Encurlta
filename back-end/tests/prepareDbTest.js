import { db } from "../config/database_config.js";

export const testmodel_urls =     {
    "stmt": "SELECT * FROM urls;",
    "header": [
        "urlCode",
        "longUrl",
        "shortUrl",
        "clickCount",
        "dateCreation"
    ],
    "rows": [
        [
            "36Ccx4wHL",
            "https://www.google.com.br",
            "localhost:5000/36Ccx4wHL",
            "1",
            "1623953636075"
        ],
        [
            "nvUlosLyk",
            "https://www.youtube.com/watch?v=Cp_biK1NyXM&ab_channel=TheSoulofWindTheSoulofWindVerificado",
            "localhost:5000/nvUlosLyk",
            "1",
            "1623953651366"
        ],
        [
            "0JEv06nZ4",
            "https://jestjs.io/pt-BR/docs/expect#tocontainitem",
            "localhost:5000/0JEv06nZ4",
            "0",
            "1623953719773"
        ],
        [
            "mDlOlmPuE",
            "https://jestjs.io/pt-BR/docs/asynchronous",
            "localhost:5000/mDlOlmPuE",
            "0",
            "1623953730374"
        ],
        [
            "88H8TnK4H",
            "https://jestjs.io/pt-BR/docs/setup-teardown",
            "localhost:5000/88H8TnK4H",
            "0",
            "1623953736885"
        ],
        [
            "-PNNh5oMi",
            "https://twitter.com/home",
            "localhost:5000/-PNNh5oMi",
            "0",
            "1623953820949"
        ],
        [
            "KNxnopk3c",
            "https://www.facebook.com/",
            "localhost:5000/KNxnopk3c",
            "0",
            "1623953833662"
        ],
        [
            "TDMowtPug",
            "https://stackoverflow.com/questions/82875/how-to-list-the-tables-in-a-sqlite-database-file-that-was-opened-with-attach",
            "localhost:5000/TDMowtPug",
            "1",
            "1623953861645"
        ]
    ]
}

export const columns = testmodel_urls.header.join(', ');

export const insertStmt = `INSERT INTO urlsTest(${columns})`;

export const allSchemas = []

export default async function prepare() {

    await dbRun(`CREATE TABLE IF NOT EXISTS urlsTest (
        urlCode TEXT PRIMARY KEY,
        longUrl TEXT NOT NULL,
        shortUrl TEXT NOT NULL,
        clickCount INTEGER NOT NULL,
        dateCreation INTEGER NOT NULL
        );`)

    const schemas = await getAllSchemas();

    schemas.forEach(schema => allSchemas.push(schema))

    testmodel_urls.rows.forEach( async (row) => {
        
        const formattedRow = `
            '${row[0]}',
            '${row[1]}',
            '${row[2]}',
             ${row[3]},
             ${row[4]}
        `
                        
        const tempStmt = insertStmt + `VALUES (${formattedRow})`

        await dbRun(tempStmt)
    })

}

export async function destroy() {
    await dbRun('DROP TABLE IF EXISTS urlsTest')
}


export function dbRun(sql) {
    return new Promise((resolve, reject) => {

        db.run(sql, (res, err) => {

            if(err) {
                console.log(err)
                return reject(err)
            }

            return resolve()

        })


    })
}

export function dbAll(sql) {
    return new Promise((resolve, reject) => {

        db.all(sql, (error, rows) => {

            if(error) {
                return reject(error)
            }

            return resolve(rows)

        })


    })
}

export function getAllSchemas() {
    return new Promise((resolve, reject) => {
        dbAll("SELECT name FROM sqlite_master WHERE type='table'")
        .then(rows => {
            resolve(rows)
        })
        .catch(err => {reject(err)});
    })
   
}