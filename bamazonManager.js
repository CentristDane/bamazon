var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon_DB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    start();
    // run the start function after the connection is made to prompt the user
});

function start() {
    inquirer
        .prompt({
            name: "options",
            type: "rawlist",
            message: "What do you want to do",
            choices: ["VIEW", "LOW INVENTORY", "ADD INVENTORY", "ADD PRODUCT"]
        })
        .then(function(answer) {
            console.log(answer);
            if (answer.options.toUpperCase() === "VIEW") {
                view();
            }
            if (answer.options.toUpperCase() === "LOW INVENTORY") {
                low();
            }
            if (answer.options.toUpperCase() === "ADD INVENTORY") {
                addIn();
            }
             if (answer.options.toUpperCase() === "ADD PRODUCT") {
                addItem();
            }
            // // else {
            // //   bidAuction();
            // }

        });
}

function view() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log(results[i].product_name + " | " + results[i].price + " | " + results[i].department_name + " | " + results[i].stock_quantity);
        }
            start();

    })


}


function low() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 5) {
                console.log(results[i].product_name + " | " + results[i].price + " | " + results[i].department_name + " | " + results[i].stock_quantity);
            }
        }

        start();

    })
}

function addIn(){
   connection.query("SELECT * FROM products", function(err, results) {
 if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What product do you want to update?"
        },
        {
          name: "update",
          type: "input",
          message: "What is the new stock?"
        }
      ])
         .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: answer.update
              },
              {
                id: chosenItem.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Bid placed successfully!");
              start();
            }
          );
        
      });

   })
}

function addItem() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the product you would like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What Department would you like to place your product in?"
      },
      {
        name: "price",
        type: "input",
        message: "How much will it cost?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
        {
        name: "stock",
        type: "input",
        message: "How much will you have in stock?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }

    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("Your product was added successfully!");
          // re-prompt the user for if they want to bid or post
          start();
        }
      );
    });
}






