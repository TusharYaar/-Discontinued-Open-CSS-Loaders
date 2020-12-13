var mysql = require("mysql");
var db_config = {
  host: "opencssdatabase-do-user-8430368-0.b.db.ondigitalocean.com", // Host name   Eg. localhost
  user: "doadmin", // Username in the database    Eg. root
  password: process.env.DATABASE_PASSWORD, // Password in the database Eg. password
  database: "defaultdb", // Database You want to connect to   Eg. Flight Database
  port: 25060, // Port
  ssl: true, //
};
var connection = mysql.createConnection(db_config);
connection.connect();

module.exports = connection;
