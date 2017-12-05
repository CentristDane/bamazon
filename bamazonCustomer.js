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

connection.connect(function(err) {

    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        for (var i = 0; i < results.length; i++) {
            console.log(results[i].product_name + " | " + results[i].price + " | " + results[i].department_name + " | " + results[i].stock_quantity);
        }
        // console.log("-----------------------------------");

        inquirer
            .prompt([{
                    name: "choice",
                    type: "input",
                    //type: "rawlist",
                    // choices: function() {
                    //     var choiceArray = [];
                    //     for (var i = 0; i < results.length; i++) {
                    //         choiceArray.push(results[i].product_name);
                    //     }
                    //     return choiceArray;
                    // },
                    message: "What item would you like to purchase?"
                },
                {
                    name: "quant",
                    type: "input",
                    message: "How many?"
                }
            ])

            .then(function(answer) {
                console.log(answer);

                // get the information of the chosen item

                var totalCost;
                var newStock;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        if (results[i].stock_quantity < parseInt(answer.quant)) {
                            console.log("Yer outta luck buddy");
                        } else if (results[i].stock_quantity >= parseInt(answer.quant)) {
                            newStock = results[i].stock_quantity - parseInt(answer.quant);
                            totalCost = parseInt(answer.quant) * results[i].price; 
                            console.log(newStock);
                            connection.query(
                                "UPDATE products SET ? WHERE ?", [{
                                        stock_quantity: newStock
                                    },
                                    {
                                        product_name: results[i].product_name
                                    }
                                ],
                                function(error) {
                                    if (error) throw err;
                                    console.log("---------------------------");
                                    console.log("Enjoy your purchase!");
                                    console.log("Total Cost:  " + totalCost);
                                    console.log("---------------------------");
                                    start();
                                }
                            );
                        }
                    }
                }
            })
    });
}


// once you have the items, prompt the user for which they'd like to bid on





//        
// 

// };