const Pool = require('pg').Pool;
require("dotenv").config();

const pool = new Pool({
    user: process.env.databaseUser,
    password: process.env.databasePassword,
    host: "localhost",
    port: 5432,
    database: "jwttutorial"
});

module.exports = pool;