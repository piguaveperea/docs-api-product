require('dotenv').config();

module.exports = {
    'DB_NAME': process.env.DB_NAME,
    'DB_PASS': process.env.DB_PASS,
    'DB_USER': process.env.DB_USER,
    'DB_HOST': process.env.DB_HOST
}