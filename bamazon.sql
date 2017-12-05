DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Halo 6", "Games", 60, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hat", "Clothes", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rifle", "Hunting", 200, 9);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mass Effect", "Games", 60, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tie", "Clothes", 30, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Knife", "Hunting", 60, 700);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook", "Computers", 1000, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Inferno", "Books", 20, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fear and Loathing", "Books", 10, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Golden Eye", "Movies", 60, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Goldfinger", "Movies", 5, 10);