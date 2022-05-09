const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String,
    },
    cpf: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    level: {
        type: Number,
    }
},{
    timetamps: true
}
)

const User = mongoose.model('usuario', UsuarioSchema)

module.exports = User