const sequilize = require('sequelize');
const setting = require('./setting')

const db = new sequilize.Sequelize(setting.DB_NAME, setting.DB_USER, setting.DB_PASS,{
    host: setting.DB_HOST,
    dialect: 'mariadb'
});

module.exports = db