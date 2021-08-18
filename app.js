(async () => {
    const database = require('./db');
    const models = require('./models/models');
    const Cliente = models.cliente;
    const Agendamento = models.agendamento;
    const Servico = models.servico;
    const Horario = models.horario;
    await database.sync();

    const express = require('express');
    const path = require('path');
    const _PORT = process.env.PORT || 3000;

    const app = express();

    app.set("view engine", "ejs");
    app.set('views', path.join(__dirname, 'views'));
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }));

    /* INICIO DAS ROTAS DE CLIENTE */
    /* A TELA INICIAL SERA A TELA DE IDENTIFICACAO DE CLIENTE */
    app.get('/', (req, res) => {
        res.redirect('clientes/new');
    });

    app.get('/clientes/new', (req, res) => {
        res.render('cliente/new');
    });

    app.post('/clientes', async (req, res) => {
        /* ANTES DE INSERIR UM NOVO CLIENTE CHECA SE O EMAIL JA ESTA CADATRADO NO BANCO */
        let cliente = await Cliente.procura(req.body.cliente);
        if (!cliente) {
            cliente = await Cliente.create(req.body.cliente)
        }

        // res.send(cliente);
        const currentDate = new Date().getTime();
        res.redirect('agendamentos/' + currentDate);
    });  
    
    app.get('/horarios', (req, res) => {
        res.render('agendamento/horario');
    });

    /* Aqui comeca as rotas de agendamento */

    app.get('/agendamentos/:d', async (req, res) => {
        const pd = Number(req.params.d);
        const currentDate = new Date(pd);
        const d = new Date(pd);
        const firstDay = new Date(d.setDate((d.getDate() - d.getDate()) + 1));
        firstDay.setDate(firstDay.getDate() - firstDay.getDay());

        const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];
        const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

        const monthYear = monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear();

        const adicionaDia = (data, y) => {
            let x = new Date(data);
            return new Date(x.setDate(x.getDate() + y))
        }

        const multiplicaDia = (data, y) => {
            let x = new Date(data);
            if (y == 0) {
                return new Date(x.setDate(x.getDate() + 6 * y))
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
            days: days,
            monthNames: monthNames,
            currentDate: currentDate,
            monthYear: monthYear,
            firstDay: firstDay,
            adicionaDia: adicionaDia,
            multiplicaDia: multiplicaDia,
            adicionaMes: adicionaMes,
            subtraiMes: subtraiMes
        });
    });

    app.listen(_PORT, () => {
        console.log(`Serving on port ${_PORT}`);
    })

})();
