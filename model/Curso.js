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
            type: String
        },
        foto: {
            originalname: {type: String},
            path: {type: String},
            size: {type: Number},
            mimetype: {type: String} 

        }
    },{
        timestamps: true
    }
)

const Cursos = mongoose.model('curso', CursoSchema)

module.exports = Cursos