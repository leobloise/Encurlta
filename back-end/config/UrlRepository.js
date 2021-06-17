import { db } from "./database_config.js";

export default class UrlRepository {

    constructor(tableName) {
        this.tableName = tableName;
        this.insertStmt =  `INSERT INTO 
        ${this.tableName}(urlCode, longUrl, shortUrl, clickCount, dateCreation) `
        this.updateStmt = `UPDATE ${this.tableName}`
    }
    /**
     * 
     * @param {array} fields
     * @param {string} keyName
     * @param {string} keyToSearch
     * @returns 
     */
    getOne(fields, keyName, keyToSearch) {

        return new Promise((resolve, reject) => {
            
            const treatedFields = fields.join(', ')

            db.get(`SELECT ${treatedFields} FROM ${this.tableName} WHERE ${keyName} LIKE "${keyToSearch}" `, (err, row) => {

                if(err) {
                    reject(err);
                    return;
                }

                resolve(row)            
                return;

            })
       
        })
    }

    createUrl(
        {urlCode, longUrl, shortUrl, clickCount, dateCreation}
    ) {
        return new Promise((resolve, reject) => {

            const stmt = `
            ${this.insertStmt}
            VALUEs('${urlCode}', '${longUrl}', '${shortUrl}', ${clickCount}, ${dateCreation})`

            return db.run(stmt, (res, err) => {
                if(err) {
                    reject(err)          
                    return;          
                }

                resolve(res)
            })

        })
    }

    update(field, newValue, urlCode) {
        return new Promise((resolve, reject) => {

            if(typeof newValue !== 'string') {
                const stmt = `
                    ${this.updateStmt}
                    SET ${field} = ${newValue}
                    WHERE urlCode = '${urlCode}'
                `
                db.run(stmt, (result, err) => {

                    if(err) {
                        console.log(err);
                        reject(err);
                        return
                    }
                    
                    resolve(result);
                })
                return;
            }

            
            const stmt = `
                ${this.updateStmt}
                SET ${field} = '${newValue}'
                WHERE urlCode = '${urlCode}'
            `
            db.run(stmt, (result, err) => {
                if(err) {
                    console.log(err);
                    reject(err);
                    return
                }
                    
                resolve(result);
            })
        })
    }

    /**
     * @param {array} fields 
     * @returns 
     */
    getAll(fields, conditions = null) {

        return new Promise((resolve, reject) => {

            const treatedFields = fields.join(', ')

            let stmt = `SELECT ${treatedFields} FROM ${this.tableName}`

            if(conditions !== null) {
                
                conditions = conditions.join(" ")
                
                stmt += ` ${conditions}`

            }

            db.all(stmt, (err, rows) => {
            
                if(err) {
                    reject(err);
                    return;
                }

                resolve(rows)            
                return;

            })
       
        })

    }


}