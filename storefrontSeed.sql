CREATE DATABASE IF NOT EXISTS bamazon;

USE bamazon;

CREATE TABLE IF NOT EXISTS products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(140) NOT NULL,
    department_name VARCHAR(140) NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
("Soap", "Fight Club", 5.00, 250),
("Dish Towels", "Kitchen", 0.99, 100)
("Laser Pointer", "Office", 20.00, 5000)
("Late 2013 Macbook Pro", "Computers", 1500.00, 10)
("Late 2013 Macbook Pro", "Computers", 1500.00, 10)
("2013 Mercedes Benz C-Class", "Automotive", 15000.00, 2),
("2009 Lexus GX470", "Automotive", 22000.00, 100)
("A4 Size Manilla Envelopes", "Office", 20.00, 5000)
("Bankers Box", "Office", 15.00, 10)
("Uniball Vision Pro Elite Pens", "Office", 1500.00, 10);