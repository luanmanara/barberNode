const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/barberNode');
    const dotenv = require('dotenv');
    const result = dotenv.config();
    const models = require('./models/models');
    const agendamentoRoutes = require('./routes/agendamento');
    const clienteRoutes = require('./routes/cliente');
    const horarioRoutes = require('./routes/horario');

    const express = require('express');
    const session = require('express-session');
    const path = require('path');
    const _PORT = process.env.PORT || 3000;
    const sessionsOptions = {
        secret: 'thisisatemposecret',
        resave: false,
        saveUninitialized: false
    };

    const app = express();

    app.set("view engine", "ejs");
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));
    app.use(session(sessionsOptions));

    app.use('/agendamentos', agendamentoRoutes);
    app.use('/clientes', clienteRoutes);
    app.use('/horarios', horarioRoutes);

    app.get('/', (req, res) => {
        res.redirect('clientes/new');
    });

    app.listen(_PORT, () => {
        console.log(`Serving on port ${_PORT}`);
    })
}