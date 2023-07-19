const sequelize = require('../config/db');
const Usuarios = require('../model/usuario');
const GrupoUsuarios = require('../model/grupousuario');
const Grupo = require('../model/grupo');
const Mensagem = require('../model/mensagens')
const socketIO = require('socket.io');

module.exports = {
  async pagHomeGet(req, res) {
    try {
      const usuarioId = req.session.edv;
      const grupoId = req.params.groupId;

      console.log(grupoId);

      const query = `
        SELECT g.IDGrupo AS id_grupo, g.Nome AS nome_grupo, g.Foto AS foto_grupo
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

      res.render('../views/chat', { participantes: participantes, grupos: grupos, usuarioId: usuarioId, grupoId });

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
      let criador = null;

      let fotogrupo = 'grupo.png';

      if (req.file) {
        fotogrupo = req.file.filename;
      }

      const novoGrupo = await Grupo.create({ Nome: nome, Foto: fotogrupo });

      if (participantes) {
        for (const participanteId of participantes) {
          await GrupoUsuarios.create({
            IDGrupo: novoGrupo.IDGrupo,
            IDUsuario: participanteId
          });
        }
      }

      for (const participanteId of parcriador) {
        if (usuarioId === participanteId.Edv) {
          criador = participanteId.IDUsuario;
          break;
        }
      }

      await GrupoUsuarios.create({
        IDGrupo: novoGrupo.IDGrupo,
        IDUsuario: criador
      });

      res.redirect('/inicio');
    } catch (err) {
      console.error('Erro ao criar grupo:', err);
      res.status(500).send('Erro ao criar grupo.');
    }
  },

  async logout(req, res) {
    req.session.destroy();
    res.redirect('/');
  },

  configureSocket(server) {
    const io = socketIO(server);
  
    io.on('connection', (socket) => {
      console.log('Cliente conectado');
  
      socket.on('join', async (grupoId) => {
        socket.join(grupoId);
        console.log(`Cliente entrou no grupo ${grupoId}`);

        try {
          const mensagensAnteriores = await Mensagem.findAll({
            where: {
              grupoId: grupoId
            },
            order: [
              ['createdAt', 'ASC']
            ]
          });
      
          socket.emit('previousMessages', mensagensAnteriores);
        } catch (error) {
          console.error('Erro ao buscar as mensagens anteriores:', error);
        }
      });
  
      socket.on('message', async (grupoId, mensagem, user) => {
        console.log(`Nova mensagem recebida no grupo ${grupoId}: ${mensagem} pelo usuário ${user}`);
        const mensagemObj = {
          mensagem: mensagem,
          remetente: user
        };
        io.to(grupoId).emit('message', mensagemObj);
  
        try {
          await Mensagem.create({
            conteudo: mensagem,
            remetente: user,
            grupoId: grupoId
          });
        } catch (error) {
          console.error('Erro ao salvar a mensagem:', error);
        }
      });
  
      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
      });
    });
  }  
};