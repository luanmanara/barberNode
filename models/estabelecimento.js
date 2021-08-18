const Sequelize = require('sequelize');
const database = require('../db');

const Estabelecimento = database.define('estabelecimento', {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Estabelecimento;