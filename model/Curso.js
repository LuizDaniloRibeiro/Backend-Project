const mongoose = require('mongoose');

const CursoSchema = mongoose.Schema({
        nome: {
            type: String,
        },
        professor: {
            type: String,
        },
        categoria: {
            type: String,
        },
        descricao: {
            type: String,
        },
        nivel: {
            type: Number
        }
    },{
        timestamps: true
    }
)

const Cursos = mongoose.model('cursos', CursoSchema)

module.exports = Cursos