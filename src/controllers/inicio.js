const sequelize = require('../config/db');
const Usuarios = require("../model/usuario");
const GrupoUsuarios = require("../model/grupousuario");
const Grupo = require("../model/grupo");

module.exports = {
  async pagHomeGet(req, res) {
    try {
      const usuarioId = req.session.edv;

      const query = `
        SELECT g.Nome AS nome_grupo, g.Foto AS foto_grupo
        FROM grupos g
        JOIN grupousuarios gu ON gu.IDGrupo = g.IDGrupo
        JOIN usuarios u ON u.IDUsuario = gu.IDUsuario
        WHERE u.Edv = :usuarioId
      `;

      const participantes = await Usuarios.findAll();

      const grupos = await sequelize.query(query, {
        type: sequelize.QueryTypes.SELECT,
        replacements: {
          usuarioId: usuarioId
        }
      });

      res.render('../views/inicio', { participantes, grupos: grupos, usuarioId});

    } catch (err) {
      console.error('Erro ao buscar participantes:', err);
      res.status(500).send('Erro ao buscar participantes.');
    }
  },

  async createGroupPost(req, res) {
    try {
      const { nome, participantes } = req.body;
      const parcriador = await Usuarios.findAll();

      const usuarioId = req.session.edv;
      var criador = null;

      let fotogrupo = 'grupo.png';

      if (req.file) {
          fotogrupo = req.file.filename;
      }
      
      const novoGrupo = await Grupo.create({ Nome: nome, Foto:fotogrupo});

      for (const participanteId of participantes) {
        await GrupoUsuarios.create({ 
          IDGrupo: novoGrupo.IDGrupo, 
          IDUsuario: participanteId });
      }

      for (const participanteId of parcriador){
        if(usuarioId == participanteId.Edv){
          criador = participanteId.IDUsuario
          break;
        }
      }

      console.log(criador);

      await GrupoUsuarios.create({
        IDGrupo: novoGrupo.IDGrupo,
        IDUsuario: criador
      })


      res.redirect('/inicio');
    } catch (err) {
      console.error('Erro ao criar grupo:', err);
      res.status(500).send('Erro ao criar grupo.');
    }
  },

  async logout(req, res) {
    req.session.destroy(); 
    res.redirect('/');
  }
};
