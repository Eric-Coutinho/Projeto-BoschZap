const grupousu = require("../model/grupousuario");
const grupo = require("../model/grupo");
const usuario = require("../model/usuario");

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

        res.redirect('/');
     }

}