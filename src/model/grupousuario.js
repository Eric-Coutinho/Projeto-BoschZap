const Sequelize = require('sequelize');
const database = require('../config/db');
const Usuario = require('./usuario');
const Grupo = require('./grupo');

const GrupoUsuario = database.define('grupousuario', {
  IDGrupoUsu: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  }
});

GrupoUsuario.belongsTo(Grupo, {
  constraint: true, 
  foreignKey: 'IDGrupo'
});

GrupoUsuario.belongsTo(Usuario, {
  constraint: true,
  foreignKey: 'IDUsuario'
});

module.exports = GrupoUsuario;
