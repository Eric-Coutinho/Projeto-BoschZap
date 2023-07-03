const Sequelize = require('sequelize');
const database = require('../config/db');

const grupo = database.define('Grupo', {

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

    Capacidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    Foto: {
        type: Sequelize.STRING(1000),
        allowNull: false
    }
});

module.exports = grupo;