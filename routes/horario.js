const models = require('../models/models');
const { Horario } = models;
const express = require('express');
const router = express.Router();

router.get('/:dia', async (req, res) => {
    const dia = Number(req.params.dia);
    const dataDia = new Date(dia);

    let horarios = await Horario.findAll({
        where: {
            dia: dataDia.getDay()
        }
    });


    horarios = horarios.length === 0 ? false : horarios;
    res.render('agendamento/horario', {
        horarios: horarios
    });
});

module.exports = router;