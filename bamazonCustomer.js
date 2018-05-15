require("dotenv").config();
var keys = require("./keys.js"); //Be sure to add your own .env file specific to your MySQL environment
var mysql = require("mysql");
var inquirer = require("inquirer");

function displayItemsInDatabase(){
    var connection = mysql.createConnection({
        host: keys.mysql_login.address,
        user: keys.mysql_login.user,
        password: keys.mysql_login.password,
        database: keys.mysql_login.database
    })

    connection.connect();

    connection.query("SELECT * FROM products", function(error, results, fields){
        if (error){
            throw error;
        }

        console.log(results);
    });

    connection.end();
}

if (require.main == module){
    //Run this code if this is the module being run
    displayItemsInDatabase();


}