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
        type: Number
    }
},
    {
        timestamps: { createdAt: 'criado_em', updatedAt: 'alterado_em' }
    }
)

const User = mongoose.model('usuario', UsuarioSchema)

module.exports = User