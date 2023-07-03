const Sequelize = require('sequelize');
const database = require('../config/db');
const usuario = require("usuario");
const grupo = require("grupo");


const grupousu = database.define('Grupo', {

    IDGrupoUsu: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
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

grupousu.belongsTo(usuario, {
    constraint: true,
    foreignKey: 'IDUsuario'
})

grupousu.belongsTo(grupo, {
    constraint: true,
    foreignKey: 'IDGrupo'
})


module.exports = grupousu;