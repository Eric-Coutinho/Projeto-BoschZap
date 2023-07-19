const express = require('express');
const router = express.Router();
const multer = require("multer");

const homeController = require('./src/controllers/home');
const inicioController = require('./src/controllers/inicio');
const recomendacaoController = require('./src/controllers/recomendacao');
const recuperaController = require('./src/controllers/recupera');
const registroController = require('./src/controllers/registro');
const chatController = require('./src/controllers/chat');

const config = require('./src/config/multer');
const registro = require('./src/controllers/registro');

const checkAuth = (req, res, next) => {
    if (!req.session.edv) {
      return res.redirect('/');
    }
    next();
  };

router.get('/', homeController.pagInicialGet).post('/', homeController.pagInicialPost);
router.get('/inicio', checkAuth, inicioController.pagHomeGet).post('/criagrupo', multer(config).single('fotogrupo'), inicioController.createGroupPost);
router.get('/recomendacao', checkAuth, recomendacaoController.pagRecomendGet);
router.get('/recupera', recuperaController.pagRecuperaGet);
router.get('/registro', registroController.pagRegistroGet);
router.get('/chat/:groupId', checkAuth, chatController.pagHomeGet).post('/criagrupo', multer(config).single('fotogrupo'), chatController.createGroupPost);
router.post('/cadastroAluno', multer(config).single('foto'), registro.pagRegistroPost);
router.get('/logout', inicioController.logout);

module.exports = router;
