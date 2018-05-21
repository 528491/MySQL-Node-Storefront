require("dotenv").config();
var keys = require("./keys.js"); //Be sure to add your own .env file specific to your MySQL environment
var mysql = require("mysql");
var inquirer = require("inquirer");

//GLOBAL VARIABLES
//Used as a stop-gap measure, asynchronous functions can not return values
var items_in_db;



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
        //TODO - clean this up so it displays in a nice table of values
        console.log(results);
    });

    connection.end();
}

function checkIfItemIsPresentInSufficientQuantitty(item_id, purchase_quantity){
    var connection = mysql.createConnection({
        host: keys.mysql_login.address,
        user: keys.mysql_login.user,
        password: keys.mysql_login.password,
        database: keys.mysql_login.database
    })
    connection.connect();

    connection.query(`SELECT * FROM products WHERE item_id = ${item_id}`, function(error, results, fields){
        if (error){
            throw error;
        }
        //TODO - clean this up so it displays in a nice table of values
        var data_object = results[0];
        var quantity = data_object.stock_quantity;
        var order_cost = data_object.price * purchase_quantity;
        if (purchase_quantity > quantity){
            console.log("Insufficient items in stock to purchase this item!");
        }
        else{
            console.log(`The cost of your order will be: $${order_cost}`);
        }
    });
    connection.end();
}

function mainUILoop(){
    //TODO - use a for loop and recursion to implement the REPL loop functionality of the UI
    var counter = 0; //Needed for synchronous execution when working with asynchronous functions
    var purchaseId; //Id of item the user wishes to purchase
    var purchaseQuantity; //Quantity of items the user wishes to purchase

    displayItemsInDatabase(); //TODO - there is a delay between when this function finishes and when the prompt begins. I want to fix this.
    //TODO - Use recursion so that this will continue in a never-ending REPL loop
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "Please enter the ID of the item you wish to purchase"
        },
        {
            tpe: "input",
            name: "item_quantity",
            message: "Please select the quantity of the item you wish to purchase"
        }
    ]).then(function(results){
        //TODO - input validation
        purchaseId = results.item_id;
        purchaseQuantity = results.item_quantity;
        checkIfItemIsPresentInSufficientQuantitty(purchaseId, purchaseQuantity);
    });
    
    
    
}

if (require.main == module){
    
    mainUILoop();

}