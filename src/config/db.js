const sequelize = require('sequelize');
const database = new sequelize('esquizofrenia', 'Materic', 'senhaforte123',
{
 dialect: 'mssql', host:'localhost', port: 59099
});
database.sync();
module.exports = database;

