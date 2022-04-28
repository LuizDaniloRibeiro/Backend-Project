const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true,

    },
    cpf: {
        type: String,
        unique: true,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true,
        select: true,
         //Não aparecer no array
    },
    level: {
        type: Number
    }
})

const User = mongoose.model('usuario', UsuarioSchema)

module.exports = User