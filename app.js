const express = require('express');
const cors = require('cors');
require('dotenv').config() //Carrega as variáveis de ambiente
const InicialazaMongoServer = require('./config/db')
const rotasUsuarios = require('./routes/users')
const rotasRegister = require('./routes/register')


InicialazaMongoServer(); //Inicializamos o MongoDB
const app = express();

app.use(express.json()); //definir que o server fará o parse do JSON
app.use(cors());

const PORT = process.env.PORT || 4000;

//rota 
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API 100% Funcional',
        versao: '1.0.0'
    })
})

app.listen(PORT, (req, res) => {
    // logoLog()
    console.log(`>>>>>>>Servidor Web iniciado com sucesso!`)
    console.log(`PORTA ${PORT}`)
})

//Rotas do App
app.use('/usuarios', rotasUsuarios)
app.use('/register', rotasRegister)


//Rota para tratar erros 404
app.use(function(req, res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})


function logoLog() {
    console.log(info('\r\n******************************************************************'))
    console.log(logo(` _______  _______  ___   _______  _______  _______  ___   _______
  |   _   ||       ||   | |        | |  _______|  |    |  
  |  |_|  ||    _  ||   | |     _  | |  |______   |    |
  |       ||   |_| ||   | |    |_| | |______   |  |    |
  |       ||    ___||   | |    ____|        |  |  |    |______
  |   _   ||   |    |   | |   |       ______|  |  |           |
  |__| |__||___|    |___| |___|      |_________|  |__________ |      | \r\n`))
    console.log(info('************************ Serviço REST API ************************'))
  }
