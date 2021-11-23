// API REST de Usuarios
const express = require('express')
const router = express.Router()

const User = require('../model/User')


/*
 ****************************
 * GET /User
 * Lista todas os usuarios
 ****************************/

router.get('/', async(req, res) => {
    console.log(User)
    try{
        const users = await User.find()
        res.json(users)
    }catch (err){
        res.status(500).send({
            erros: [{message: `Não foi possivel obter os usuarios`}]
        })
    }
})

/*
 ****************************
 * POST /User
 * Incluir um novo usuarios
 ****************************/

router.post('/', async(req, res) => {
    try{
        const usuario = new User(req.body)
        await usuario.save()
        res.send(usuario)
        console.log(usuario);
    }catch (err){
        return res.status(500).json({
            errors: [{message: `Erro ao salvar o usuario: ${err.message}`}]
        })
    }
})


/*
 ****************************
 * PUT /User
 * Atualizar Usuario
 ****************************/

 router.put('/', async(req, res) => {
     try{

     }catch (err){
         return res.status(500).json({
             errors: [{message: `Erro ao Atualizar o Usuario`}]
         })
     }
 })



module.exports = router