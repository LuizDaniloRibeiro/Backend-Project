const express = require('express');
const cors = require('cors');
require('dotenv').config() //Carrega as variáveis de ambiente
const InicialazaMongoServer = require('./config/db')
const rotasUsuarios = require('./routes/Usuario')


InicialazaMongoServer(); //Inicializamos o MongoDB

const app = express();

app.use(express.json()); //definir que o server fará o parse do JSON

app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(function(req, res, next) {
    // Em produção, remova o '*' e atualize com o domínio do seu app
   res.setHeader("Access-Control-Allow-Origin", '*');
   // Cabeçalhos que serão permitidos
   //res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-token");
   res.setHeader("Access-Control-Allow-Headers", "*");
   // Métodos que serão permitidos
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   next();  
 });

//Rota default
app.get('/', (req, res) => {
    const languages = req.headers['accept-language']
    res.json({
        mensagem: 'API 100% Funcional 👏',
        versao: '1.0.0'
    })
})

/* Rotas do Usuário */
app.use('/usuarios', rotasUsuarios)

app.use(function(req, res, next) {
    res.status(404).json({message: `Desculpe, a rota ${req.originalUrl} não existe`});
});

//Rotas do App
app.listen(PORT, (req, res) => {
    // logoLog()
    console.log('************* Serviço REST API ****************')
    console.log(`🖥️ Servidor Web iniciado com sucesso na PORTA ${PORT}!`)
})



//Rota para tratar erros 404
app.use(function(req, res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})


function logoLog() {
    console.log(info('\r\n*****************************************'))
    console.log(logo(` _______  _______  ___   _______  _______  
  |   _   ||       ||   | |        | |  _______|  |    |  
  |  |_|  ||    _  ||   | |     _  | |  |______   |    |
  |       ||   |_| ||   | |    |_| | |______   |  |    |
  |       ||    ___||   | |    ____|        |  |  |    |______
  |   _   ||   |    |   | |   |       ______|  |  |           |
  |__| |__||___|    |___| |___|      |_________|  |__________ |  \r\n`))
    console.log(info('************* Serviço REST API ****************'))
  }


