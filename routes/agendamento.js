const models = require('../models/models');
const { Agendamento, Horario } = models;
const express = require('express');
const router = express.Router();

/* Aqui comeca as rotas de agendamento */
router.get('/', async (req, res) => {
    const currentDate = new Date().getTime();
    res.render('agendamento', {
        currentDateTime: currentDate
    });
});

router.get('/calendario/:dia', (req, res) => {
    const dia = Number(req.params.dia);
    const dataAtual = new Date(dia);
    dataAtual.setHours(0, 0, 0, 0);
    const d = new Date(dia);
    const primeiroDia = new Date(d.setDate((d.getDate() - d.getDate()) + 1));
    primeiroDia.setDate(primeiroDia.getDate() - primeiroDia.getDay());

    const dias = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    const nomeMeses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    const mesAno = nomeMeses[dataAtual.getMonth()] + " " + dataAtual.getFullYear();

    const adicionaDia = (data, y) => {
        let x = new Date(data);
        x.setHours(0, 0, 0, 0);
        return new Date(x.setDate(x.getDate() + y));
    }

    const multiplicaDia = (data, y) => {
        let x = new Date(data);
        x.setHours(0, 0, 0, 0);
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

    res.render('agendamento/calendario', {
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
    const { agendamento } = req.body;
    const horarioId = agendamento.horarioId;
    const horario = await Horario.findOne({ _id: req.session.clienteId }).exec();

    // MONTA CORPO DO AGENDAMENTO
    const dadosAgendamento = {
        estabelecimento: req.session.estabelecimentoId,
        cliente: req.session.clienteId,
        horario: horarioId,
        dia: new Date(agendamento.dataDia).toISOString()
    };

    // CRIA NOVO AGENDAMENTO
    console.log(dadosAgendamento);
    const novoAgendamento = new Agendamento(dadosAgendamento);
    novoAgendamento.save();

    res.redirect('horarios/' + new Date(agendamento.dataDia).getTime());
});

module.exports = router;