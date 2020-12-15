var mysql = require("mysql");
var db_config = {
  host: process.env.DATABASE_URL, // Host name   Eg. localhost
  user: process.env.DATABASE_USER, // Username in the database    Eg. root
  password: process.env.DATABASE_PASSWORD, // Password in the database Eg. password
  database: process.env.DATABASE_NAME, // Database You want to connect to   Eg. Flight Database
  port: 25060, // Port
  ssl: true, //
};
var connection = mysql.createConnection(db_config);
connection.connect();

module.exports = connection;
