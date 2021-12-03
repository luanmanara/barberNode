const database = require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Servico = mongoose.model(
    "Servico",
    new mongoose.Schema({
        descricao: String,
        estabelecimento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Estabelecimento"
        }
    })
);

module.exports = Servico;