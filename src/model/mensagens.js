const Sequelize = require('sequelize');
const database = require('../config/db');
const Grupo = require('./grupo');
const Usuario = require('./usuario');

const Mensagem = database.define('mensagem', {
  idMensagem: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  conteudo: {
    type: Sequelize.STRING,
    allowNull: false
  },
  remetente: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

Mensagem.belongsTo(Grupo, {
  foreignKey: 'grupoId',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

module.exports = Mensagem;
