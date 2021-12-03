const Estabelecimento = require('./estabelecimento');
const Cliente = require('./cliente');
const Agendamento = require('./agendamento');
const Servico = require('./servico');
const Horario = require('./horario');

// Estabelecimento.hasMany(Cliente);
// Estabelecimento.hasMany(Agendamento);
// Estabelecimento.hasMany(Servico);
// Estabelecimento.hasMany(Horario, {constraints: false});

// Horario.hasOne(Agendamento, {constraints: false});
// Horario.hasOne(Estabelecimento, {constraints: false});

// Cliente.hasMany(Agendamento);
// Servico.hasMany(Agendamento);

module.exports = {
    Cliente: Cliente,
    Agendamento: Agendamento,
    Servico: Servico,
    Horario: Horario,
    Estabelecimento: Estabelecimento
}