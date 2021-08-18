const Sequelize = require('sequelize');
const database = require('../db');

const Cliente = database.define('cliente', {
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
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Cliente.procura = async (cliente) => {
    const existCliente = await Cliente.findAll({
        where: {
            email: cliente.email
        }
    });

    return existCliente.length === 0 ? false : existCliente;
};

module.exports = Cliente;