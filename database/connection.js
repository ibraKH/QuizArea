const mysql = require('mysql2')
const dotenv = require("dotenv").config();

// Mysql connection
const db = mysql.createConnection({
    host     : "eu-cdbr-west-02.cleardb.net",
    user     : "b7b58c79a1c541",
    password : "b0728698",
    database : "heroku_c204b14fad2b6d4",
    insecureAuth : true
});
db.connect((err) => {
        if(err){
            console.log(err);
        }
        console.log("connected...");
});

module.exports = db;