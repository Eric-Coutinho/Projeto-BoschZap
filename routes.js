const express = require('express');
const router = express.Router();

const homeController = require('./src/controllers/home');
const inicioController = require('./src/controllers/inicio');
const recomendacaoController = require('./src/controllers/recomendacao');
const recuperaController = require('./src/controllers/recupera');
const registroController = require('./src/controllers/registro');
const chatController = require('./src/controllers/chat');


const checkAuth = (req, res, next) => {
    if (!req.session.edv) {
      return res.redirect('/');
    }
    next();
  };

router.get('/', homeController.pagInicialGet).post('/', homeController.pagInicialPost);
router.get('/inicio', checkAuth, inicioController.pagHomeGet).post('/criagrupo', inicioController.createGroupPost);
router.get('/recomendacao', checkAuth, recomendacaoController.pagRecomendGet);
router.get('/recupera', recuperaController.pagRecuperaGet);
router.get('/registro', registroController.pagRegistroGet).post('/registro', registroController.pagRegistroPost);
router.get('/chat', chatController.pagChatGet).post('/chat', chatController.createGroupPost);

module.exports = router;
