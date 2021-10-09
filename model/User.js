const mongoose = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    nome:  {type: String},
    status:  {type: String, enum: ['ativo','inatio'], default: 'ativo'}
},{timestamps:true})

module.exports = mongoose.model('usuario',UsuarioSchema)