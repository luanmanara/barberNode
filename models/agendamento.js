const Sequelize = require('sequelize');
const database = require('../db');

const Agendamento = database.define('agendamento', {
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
    clienteId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'clientes',
            key: 'id'
        }
    },
    servicoId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'servicos',
            key: 'id'
        }
    },
    horarioId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'horarios',
            key: 'id'
        }
    },
    dia :{
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = Agendamento;