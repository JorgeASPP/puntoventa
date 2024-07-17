// config/database.js
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD // Dejar como cadena vacía si no hay contraseña
});

module.exports = db;
