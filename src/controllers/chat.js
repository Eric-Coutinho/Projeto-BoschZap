const Usuarios = require("../model/usuario");
const GrupoUsuarios = require("../model/grupousuario");
const Grupo = require("../model/grupo");

module.exports = {
    async pagChatGet(req, res){
        try {
            const participantes = await Usuarios.findAll();
            const grupos = await Grupo.findAll();
            res.render('../views/chat', {participantes, grupos});

          } catch (err) {
            console.error('Erro ao buscar participantes:', err);
            res.status(500).send('Erro ao buscar participantes.');
          }
    },

    async createGroupPost(req, res) {
        try {
          const { nome, participantes } = req.body;

          const novoGrupo = await Grupo.create({ Nome: nome });
    
          for (const participanteId of participantes) {
            await GrupoUsuarios.create({ IDGrupo: novoGrupo.IDGrupo, IDUsuario: participanteId });
          }
    
          res.redirect('/inicio');
        } catch (err) {
          console.error('Erro ao criar grupo:', err);
          res.status(500).send('Erro ao criar grupo.');
        }
      }
}
