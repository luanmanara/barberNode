const models = require('../models/models');
const { Horario, Estabelecimento } = models;
const express = require('express');
const router = express.Router();

router.get('/:dia', async (req, res) => {
    const dia = Number(req.params.dia);
    const dataDia = new Date(dia);

    let horarios = await Horario.find({ dia: dataDia.getDay(), estabelecimento: req.session.estabelecimentoId }).exec();
    
    horarios = horarios.length === 0 ? false : horarios;
    res.render('agendamento/horario', {
        dataDia: dataDia,
        horarios: horarios
    });
});

module.exports = router;