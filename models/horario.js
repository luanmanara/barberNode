const Sequelize = require('sequelize');
const database = require('../db');

const Horario = database.define('horario', {
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
    dia: {
        type: Sequelize.STRING,
        allowNull: false
    },
    horario: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Horario;