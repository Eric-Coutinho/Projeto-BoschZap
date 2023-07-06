const Usuarios = require("../model/usuario");
const GrupoUsuarios = require("../model/grupousuario");

module.exports = {
    async pagHomeGet(req, res){
        try {
            const participantes = await Usuarios.findAll();
            res.render('../views/inicio', {participantes});

          } catch (err) {
            console.error('Erro ao buscar participantes:', err);
            res.status(500).send('Erro ao buscar participantes.');
          }
    },

    async createGroupPost(req, res){
        dados = req.body;
        
        GrupoUsuarios.create({
            Capacidade: 20,
            Foto: "",
            
        });

        res.redirect('/inicio');
    }
}
