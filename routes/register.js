//API REST de Register
const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();

const User = require('../model/User');

/**
 * **********************
 * POST /User
 * Incluindo um novo usuario
 * ***********************/

router.post('/', async(req, res) => {
    try{
        const novoUsuario = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            password: req.body.password,
            level: req.body.level,
        };
        let usuario = new User(novoUsuario);
        await usuario.save();
    }catch(err){
        return res.status(500).json({
            errors: [{message: `Erro ao cadastrar o usuario ${err.message}`}]
        })
    }
})

module.exports = router