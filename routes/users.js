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
        await usuario.save();
        res.send(usuario);
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
        const usuario = await User.findByIdAndUpdate(req.body._id)
        await usuario.send({ usuario })
        console.log(usuario);
     }catch (err){
         return res.status(500).json({
             errors: [{message: `Erro ao Atualizar o Usuario`}]
         })
     }
 })

 /*
  * ***********************
  * DELETE /User
  * Remover Usuário
  *************************/

 router.delete('/:id', async (req, res) => {
     await User.findByIdAndRemove(req.params.id)
     .then((usuario) => {
         res.send({
             message: `Usuário ${usuario.nome} removido com sucesso!`,
         });
     })
     .catch((err) => {
         return res.status(500).send({
             errors: [
                 {
                     message: `Ops! Não foi possível apagar o usuáio!`
                 },
             ],
         });
     });
 });


module.exports = router