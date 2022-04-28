// API REST de Login
const express = require("express");
const HttpStatus = require('http-status-codes');
const bcryot = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../model/User');

const authConfig = require('../config/auth.json')

//Geração do Token
function gerarToken(params = {}) {
    return jwt.sign(params, authConfig.SECRET, { expiresIn: 86400 })
}

//Rota de Autenticação
router.post('/login', async function (req, res) {

    const { password } = req.body
    const { usuario: usuário } = req.body

    var user = await User.findOne({ email: usuário}).select('+password')
    if(!user){
        return res.status(HttpStatus.BAD_REQUEST)
        .send({ error: 'Usuário não encontrado!' })
    }

    //verificar se usuário está ativo
    if(user.level === 0){
        return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ error: 'Esse Usuário foi desativado!' })
    }

    res.send({user, token: gerarToken({ id: user.id})})
})

module.exports = (app) => app.use('/auth', router)