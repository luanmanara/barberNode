const database = require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cliente = mongoose.model(
    "Cliente",
    new mongoose.Schema({
        email: String,
        nome: String,
        telefone: String,
        estabelecimento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Estabelecimento"
        }
    })
);

// const Cliente = Joi.object({
//     estabelecimentoId: Joi.string().guid().required(),
//     email: Joi.string().email().required(),
//     nome: Joi.string().min(3).max(30).required(),
//     telefone: Joi.string().length(15).required(),
// });

// Cliente.procura = async (cliente) => {
//     const existCliente = await Clientes.findOne({email: cliente.email});
//     return !existCliente ? false : existCliente;
// };

module.exports = Cliente;