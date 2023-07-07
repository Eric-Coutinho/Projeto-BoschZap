const grupousu = require("../model/grupousuario");
const grupo = require("../model/grupo");
const usuario = require("../model/usuario");
const session = require('express-session');

module.exports = {
    async pagRegistroGet(req, res){
        res.render('../views/registro');
    },

     async pagRegistroPost(req, res){
        const dados = req.body;

        await usuario.create({
            Nome: dados.nome,
            Idade: dados.idade,
            Edv: dados.edv,
            Turma: dados.turma
        });

        req.session.userID = dados.id; 

        res.redirect('/');
     }

}