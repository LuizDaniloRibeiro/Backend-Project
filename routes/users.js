// API REST de Usuarios
const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

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
        const email = req.body.email;
        const cpf = req.body.cpf;

        if (await User.findOne({ email }))
            return res
            .status(401)
            .send({error: 'E-mail já existe'})
        
        if (await User.findOne({ cpf }))
            return res
            .status(400)
            .send({error: 'CPF já existe'})    

        const novoUsuario = {
            nome: req.body.nome,
            cpf: req.body.cpf,
            email: req.body.email,
            password: req.body.password,
            level: req.body.level,
        };
        let usuario = new User(novoUsuario);
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

 /**
 * @method - POST
 * @param - /usuario/login
 * @description - Login do usuário
 */
router.post(
    "/login",
    [
      check("email", "Por favor, informe um e-mail válido").isEmail(),
      check("password", "Informe uma password com no mínimo 6 caracteres").isLength({
        min: 6
      })
    ],
    async (req, res) => {
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(200).json({
          errors: errors.array()
        });
      }
  
      const { email, password } = req.body;
      try {
        let usuario = await User.findOne({
          email
        });
        if (!usuario)
          return res.status(200).json({
            errors: [{ msg: "Não existe nenhum usuário com o e-mail informado!" }]
          });
  
        const isMatch = await bcrypt.compare(password, usuario.password);
        if (!isMatch)
          return res.status(200).json({
            errors: [{ msg: "A password informada está incorreta !" }]
          });
  
        const payload = {
          usuario: {
            id: usuario._id
          }
        };
  
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.EXPIRES_IN
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              access_token: token,
              usuario: {
                id: usuario._id,
                nome: usuario.nome,
                level: usuario.level
              }
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          errors: [{ msg: `Erro no Servidor: ${e.message}` }]
        });
      }
    }
  );
  
  
 
module.exports = router