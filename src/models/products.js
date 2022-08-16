const db = require('../db')
const { DataTypes } = require('sequelize')
const Product = db.define('Product',{
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE
},{
    tableName: 'product',
    createdAt: false,
    updatedAt: false
})
module.exports = Product