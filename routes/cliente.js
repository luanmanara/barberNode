const models = require('../models/models');
const { Cliente, Estabelecimento } = models;
const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.render('cliente/new');
});

router.post('/', async ( req, res ) => {
    /* ANTES DE INSERIR UM NOVO CLIENTE CHECA SE O EMAIL JA ESTA CADASTRADO NO BANCO */
    let cliente = await Cliente.procura(req.body.cliente);
    if (!cliente) {
        cliente = await Cliente.create(req.body.cliente)
    }

    req.session.cliente = cliente[0];
    const currentDate = new Date().getTime();
    res.redirect('agendamentos/' + currentDate);
});

module.exports = router;