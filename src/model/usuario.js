const Sequelize = require('sequelize');
const database = require('../config/db');

const Usuario = database.define('usuario', {
  IDUsuario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Nome: {
    type: Sequelize.STRING(250),
    allowNull: false
  },
  Edv: {
    type: Sequelize.STRING(10),
    allowNull: false
  },
  Idade: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  Turma: {
    type: Sequelize.STRING(75),
    allowNull: false
  },
  Foto: {
    type: Sequelize.STRING(1000),
    allowNull: true
  }
});

module.exports = Usuario;
