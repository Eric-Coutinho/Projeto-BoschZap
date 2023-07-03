const grupousu = require("../model/grupousuario");
const grupo = require("../model/grupo");
const usuario = require("../model/usuario");

module.exports = {
    async pagRegistroGet(req, res){
        res.render('../views/registro');
    }
}