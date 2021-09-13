const models = require('../models/models');
const { Horario, Agendamento, Estabelecimento } = models;
const express = require('express');
const router = express.Router();

router.get('/:dia', async (req, res) => {
    const dia = Number(req.params.dia);
    const dataDia = new Date(dia);

    let horarios = await Horario.findAll({
        include: Agendamento,
        where: {
            dia: dataDia.getDay(),
            estabelecimentoId: req.session.estabelecimentoId
        }
    });


    horarios = horarios.length === 0 ? false : horarios;
    res.render('agendamento/horario', {
        dataDia: dataDia,
        horarios: horarios
    });
});

module.exports = router;