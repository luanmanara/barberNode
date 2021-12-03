const database = require('../db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Estabelecimento = mongoose.model(
    "Estabelecimento",
    new mongoose.Schema({
        nome: String,
        email: String
    })
);

module.exports = Estabelecimento;