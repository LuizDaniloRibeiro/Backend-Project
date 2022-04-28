const mongoose = require('mongoose')
const MONGOURI = process.env.MONGODB_URL
require('dotenv').config() //Carrega as variáveis de ambiente


const InicializaMongoServer = async() => {  
    try{
        await mongoose.connect(MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`🔌 Conectado com sucesso ao MongoDB!`)
        console.log('************* Versão 1.0.0 ****************')

    }catch(e){
        console.error(e)
        throw e
    }
}
module.exports = InicializaMongoServer