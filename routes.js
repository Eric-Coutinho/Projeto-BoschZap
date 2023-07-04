const express = require('express');
const route = express.Router();

const home = require('./src/controllers/home');

const inicio = require('./src/controllers/inicio');

const recomendacao = require('./src/controllers/recomendacao');

const recupera = require('./src/controllers/recupera');

const registro = require('./src/controllers/registro');

route.get('/', home.pagInicialGet).post('/', home.pagInicialPost);
route.get('/inicio', inicio.pagHomeGet);
route.get('/recomendacao', recomendacao.pagRecomendGet);
route.get('/recupera', recupera.pagRecuperaGet);
route.get('/registro', registro.pagRegistroGet).post('/registro', registro.pagRegistroPost);

module.exports = route;
