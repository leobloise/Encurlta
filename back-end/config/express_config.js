import express from 'express'; 
import prepareDatabase from "./database_config.js";

function prepareServer() {
    return new Promise((resolve, reject) => {
        

        prepareDatabase()
        .then(res => {
            const app = express(); 
        
            app.use(express.json({extended: false}))
            
            app.use(function(req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                next();
            });

            const port = 5000 || process.env.PORT;

            resolve({port: port, app: app});
        })
        .catch(err => {
            console.log(err);
            process.exit();
        })
    })
}

export {prepareServer}

