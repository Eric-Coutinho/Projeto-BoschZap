const Sequelize = require('sequelize');
const database = require('../config/db');

const Grupo = database.define('grupo', {
  IDGrupo: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  Nome: {
    type: Sequelize.STRING(100),
    allowNull: false
  },
  Foto: {
    type: Sequelize.STRING(1000),
    allowNull: true
  }
});

module.exports = Grupo;
