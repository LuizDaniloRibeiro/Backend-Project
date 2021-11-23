const express = require('express');
require('dotenv').config() //Carrega as variáveis de ambiente
const InicialazaMongoServer = require('./config/db')
const rotasUsuarios = require('./routes/users')


InicialazaMongoServer(); //Inicializamos o MongoDB
const app = express();

app.use(express.json()) //definir que o server fará o parse do JSON

const PORT = process.env.PORT;

//rota 
app.get('/', (req, res) => {
    res.json({
        mensagem: 'API 100% Funcional',
        versao: '1.0.0'
    })
})

app.listen(PORT, (req, res) => {
    console.log(`Servidor Web rodando na porta ${PORT}`)
})

//Rotas do App
app.use('/usuarios', rotasUsuarios)


//Rota para tratar erros 404
app.use(function(req, res){
    res.status(404).json({
        mensagem: `A rota ${req.originalUrl} não existe!`
    })
})

