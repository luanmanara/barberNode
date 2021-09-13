const models = require('../models/models');
const { Agendamento } = models;
const express = require('express');
const router = express.Router();

/* Aqui comeca as rotas de agendamento */
router.get('/:dia', async (req, res) => {
    console.log(req.session.cliente);
    const dia = Number(req.params.dia);
    const dataAtual = new Date(dia);
    dataAtual.setHours(0,0,0,0);
    const d = new Date(dia);
    const primeiroDia = new Date(d.setDate((d.getDate() - d.getDate()) + 1));
    primeiroDia.setDate(primeiroDia.getDate() - primeiroDia.getDay());

    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const mesAno = nomeMeses[dataAtual.getMonth()] + " " + dataAtual.getFullYear();

    const adicionaDia = (data, y) => {
        let x = new Date(data);
        x.setHours(0,0,0,0);
        return new Date(x.setDate(x.getDate() + y));
    }

    const multiplicaDia = (data, y) => {
        let x = new Date(data);
        x.setHours(0,0,0,0);
        if (y == 0) {
            return new Date(x.setDate(x.getDate() + 6 * y));
        } else {
            return new Date(x.setDate((x.getDate() + 6 * y) + y));
        }
    }

    const adicionaMes = (data) => {
        let x = new Date(data);
        return new Date(x.setMonth(x.getMonth() + 1));
    }

    const subtraiMes = (data) => {
        let x = new Date(data);
        return new Date(x.setMonth(x.getMonth() - 1));
    }

    res.render('agendamento', {
        dias: dias,
        dataAtual: dataAtual,
        mesAno: mesAno,
        primeiroDia: primeiroDia,
        adicionaDia: adicionaDia,
        multiplicaDia: multiplicaDia,
        adicionaMes: adicionaMes,
        subtraiMes: subtraiMes
    });
});

router.post('/', async (req, res) => {
    const {agendamento} = req.body;
    const horario = JSON.parse(agendamento.horario);

    // MONTA CORPO DO AGENDAMENTO
    const dadosAgendamento = {
        estabelecimentoId: horario.estabelecimentoId,
        clienteId: req.session.cliente.id,
        horarioId: horario.id,
        dia: new Date(agendamento.dataDia).toISOString()
    };

    // CRIA NOVO AGENDAMENTO
    const novoAgendamento = await Agendamento.create(dadosAgendamento);

    res.redirect('horarios/' + new Date(agendamento.dataDia).getTime());
});

module.exports = router;