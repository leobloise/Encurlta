import { prepareServer } from "./config/express_config.js";
import routes from './app/routes/index.js'

prepareServer()
.then(({port, app}) => {
    
    app = routes(app);

    app.listen(port, () => {
        console.log('Servidor Online na porta ' + port)
    })

})

