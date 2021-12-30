const express = require("express");
const bodyparser = require("body-parser");
const dotenv = require("dotenv").config();
const path = require("path");


let app = express();
const PORT = process.env.PORT || 3009

// to eable ejs access html
app.set("view engine", "ejs");

// access public files or photo in the folder public
let publicDierctory = path.join(__dirname, "./public");

app.use(express.static(publicDierctory));


//
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// access the routes
app.use("/", require("./routes/pages"));
//app.use("/auth", require("./routes/auth"));

// listening at port 3000
app.listen(PORT, (err) =>{
    err ? console.log(err) : console.log("listening at port 3009");
});