const express = require("express");
const router = express.Router();

const Cursos = require("../model/Curso");


/*
 ****************************
 * GET /Curso
 * Lista todas os cursos
 ****************************/

 router.get('/', async(req, res) => {
    try{
        const curso = await Cursos.find()
        res.json(curso)
    }catch (err){
        res.status(500).send({
            erros: [{message: `Não foi possivel obter os cursos`}]
        })
    }
})

router.get('/:id', async (req, res) => {
    console.log(req.params.id);
    await Cursos.findById(req.params.id)
        .then(curso => {
            res.send(curso);
        }).catch(err => {
            return res.status(500).send({
                errors: [{ message: `Não foi possível obter o curso com o ID ${req.params._id}` }]   });
        })
})

/* #####################################
// Atualizar o curso pelo ID
######################################## */

router.put('/', async(req, res) => {
    try{
        let dados = req.body;

        await Cursos.findByIdAndUpdate(req.body._id, {
            $set: dados
            
        },{new: true})
        .then(curso => {
            res.send({message: `Curso ${curso.nome} alterado com sucesso!`});
        }).catch(err => {
            return res.status(500).send({
                errors: [{ message: `Não foi possível alterar o curso com ID ${req.body._id}` }]
            })
        })
        res.json(curso);

        await curso.save();

    }catch (err){
        res.status(500).send({
            erros: [{message: `Não foi possivel obter os cursos`}]
        })
    }
})


/* #####################################
// Apaga o curso pelo ID
######################################## */
router.delete("/:id", async (req, res) => {
    await Cursos.findByIdAndRemove(req.params.id)
        .then(curso => {
            res.send({ message: `Curso ${curso.nome} removido com sucesso!` });
        }).catch(err => {
            return res.status(500).send({
                errors: [{ message: `Não foi possível apagar o curso com o ID ${req.params.id}` }]
            })
        })
})


/**
 * @method - POST
 * @param - /cursos/register-curso
 * @description - Cadastrar Novo Curso
 */

router.post('/register-curso',
    async  (req, res) => {
        try{
            curso = new Cursos({
                nome: req.body.nome,
                professor: req.body.professor,
                categoria: req.body.categoria,
                descricao: req.body.descricao,
                nivel: req.body.nivel,

            });

            console.log(curso);
            

            await curso.save();

        }catch(e){
            return res.status(500).json({
                errors: [{ msg: `Erro! Houve problema para cadastrar o curso: ${e.message}`}]
            })
        }
    }
);



module.exports = router;
  