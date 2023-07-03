const Sequelize = require('sequelize');
const database = require('../config/db');

const usuario = database.define('Aluno', {

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
        type: Sequelize.INTEGER,
        allowNull: false
    },

    Idade: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    Foto: {
        type: Sequelize.STRING(1000),
        allowNull: false
    }
});

module.exports = usuario;