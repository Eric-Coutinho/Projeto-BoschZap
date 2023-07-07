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

Grupo.belongsToMany(Usuario, { through: GrupoUsuario, foreignKey: 'IDGrupo' });
Usuario.belongsToMany(Grupo, { through: GrupoUsuario, foreignKey: 'IDUsuario' });

module.exports = GrupoUsuario;
