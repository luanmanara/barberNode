const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Agendamento = mongoose.model(
    "Agendamento",
    new mongoose.Schema({
        dia: Date,
        estabelecimento: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Estabelecimento"
        },
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cliente"
        },
        servico: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Servico"
        },
        horario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Horario"
        },
    })
);

// Joi.object({
//     estabelecimentoId: Joi.string().guid().required(),
//     clienteId: Joi.number().integer().required(),
//     servicoId: Joi.number().integer().required(),
//     horarioId: Joi.number().integer().required(),
//     dia: Joi.date().timestamp()
// });

module.exports = Agendamento;