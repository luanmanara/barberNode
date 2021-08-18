const Sequelize = require('sequelize');
const database = require('../db');

const Servico = database.define('servico', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    estabelecimentoId: {
        type: Sequelize.UUID,
        references: {
            model: 'estabelecimentos',
            key: 'id'
        }
    },
    descricao: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Servico;