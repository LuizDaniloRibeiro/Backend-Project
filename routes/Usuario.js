const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const Usuario = require("../model/User");


//TOKEN JWT
function verificaJWT(req, res, next) {
    const token = req.headers['x-access-token'];
    const tokenFormated = token;
  
    if (!token)
      return res.status(401).json({ auth: false, message: 'No token provided.' });
  
    jwt.verify(tokenFormated, tokenSecret, function (err, decoded) {
      if (err)
        return res
          .status(500)
          .json({ auth: false, message: 'Failed to authenticate token' });
  
      req.userId = decoded.id;
      next();
    });
}



/*
 ****************************
 * GET /User
 * Lista todas os usuarios
 ****************************/

 router.get('/', async(req, res) => {
    try{
        const users = await Usuario.find()
        res.json(users)
    }catch (err){
        res.status(500).send({
            erros: [{message: `Não foi possivel obter os usuarios`}]
        })
    }
})


/**
 * @method - POST
 * @param - /usuarios/register
 * @description - Cadastrar Novo Usuário
 */

router.post('/register',
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {email, cpf, password} = req.body;

        try{
            if(await Usuario.findOne({email})){
                return res.status(400).json({
                    errors: [{ msg: `O e-mail informado já existe!\nPor favor insira um e-mail diferente.`}]
                });
            }
    
            usuario = new Usuario({
                nome: req.body.nome,
                email: req.body.email,
                password: req.body.password,
                level: req.body.level,
            });


            //criptografia da senha
            const salt = await bcrypt.genSalt(10); //impede que uma mesma senha tenha resultados iguais
            usuario.password = await bcrypt.hash(password, salt);

            await usuario.save();

            const payload = {
                usuario: {
                    id: usuario._id
                }
            };

            jwt.sign(
                payload,
                process.env.SECRET_KEY,
                {
                    expiresIn: 3650
                },
                (err, token) => {
                    if(err) throw err;
                    res.status(200).json({
                        access_token: token,
                        usuario: {
                            id: usuario_id,
                            nome: usuario.nome,
                            level: usuario.level
                        }
                    });   
                }

            );

            console.log('cadastrado com sucesso!');
        }catch(e){
            console.log(e)
            return res.status(500).json({
                errors: [{ msg: `Erro! Houve problema para cadastrar o usuário: ${e.message}`}]
            })
        }
    }
);



/**
 * @method - POST
 * @param - /usuario/login
 * @description - Login do usuário
 */
 
 router.post('/login',
   async (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(200).json({
                errors: errors.array()
            })
        }

        console.log(req.body)

        const { email, password} = req.body;
        try{
            let usuario = await Usuario.findOne({email});

            console.log(usuario)

            //verificando usuarios
            if(!usuario){
                return res.status(500).json({
                    errors: [{ msg: "Opos! Não existe nenhum usuário com o e-mail informado!"}]
                });  
            }


            //comparando a senha criptografada
            const isMatch = await bcrypt.compare(password, usuario.password);
            if (isMatch === false){
                return res.status(500).json({
                  errors: [{ msg: "A senha informada está incorreta !"}]
                });
            }

            const payload = {
                usuario: {
                    id: usuario.id
                }
            };

            jwt.sign(
                payload,
                process.env.SECRET_KEY,
                {
                    expiresIn: 3600
                },
                (err, token) => {
                    if(err) throw err;
                    res.status(200).json({
                        access_token: token,
                        usuario: {
                            id: usuario.id,
                            nome: usuario.nome,
                            level: usuario.level
                        }

                    });
                }
            );
        }catch(err){
            console.log(err);
            res.status(500).json({
                errors: [{ msg: `Erro no Servidor: ${err.message}`}]
            });
        }
    }
);

module.exports = router;
  