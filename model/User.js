const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    }
},{
    timetamps: true
}
)

module.exports = mongoose.model('users', UsuarioSchema)