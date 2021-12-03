const database = require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Horario = mongoose.model(
    "Horario",
    new mongoose.Schema({
        dia: Number,
        horario: String,
        estabelecimento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Estabelecimento"
        }
    })
);

module.exports = Horario;