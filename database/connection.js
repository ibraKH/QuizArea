const mysql = require('mysql2')
const dotenv = require("dotenv").config();

// Mysql connection
const db = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.database,
    insecureAuth : true
});
db.connect((err) => {
        if(err){
            console.log(err);
        }
        console.log("connected...");
});

module.exports = db;