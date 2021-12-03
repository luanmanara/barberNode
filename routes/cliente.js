const models = require('../models/models');
const { Cliente } = models;
const express = require('express');
const router = express.Router();

router.get('/new', (req, res) => {
    res.send('ESTABELECIMENTO NAO ESPECIFICADO');
});

router.get('/new/:estabelecimentoId', (req, res) => {
    const estabelecimentoId = req.params.estabelecimentoId;
    req.session.estabelecimentoId = estabelecimentoId;
    res.render('cliente/new');
});

router.post('/', async (req, res) => {
    const clienteForm = req.body.cliente;
    clienteForm.estabelecimento = req.session.estabelecimentoId;

    /* ANTES DE INSERIR UM NOVO CLIENTE CHECA SE O EMAIL JA ESTA CADASTRADO NO BANCO */
    const cliente = await Cliente.findOne({ email: clienteForm.email }).exec();

    if (!cliente) {
        const novoCliente = new Cliente(clienteForm);
        novoCliente.save();
        req.session.clienteId = novoCliente._id;
    } else {
        req.session.clienteId = cliente._id;
    }

    console.log(req.session.clienteId);
    res.redirect('agendamentos');
});

module.exports = router;