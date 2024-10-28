const {
    Client
} = require('pg');
const {
    argv
} = require('node:process');

const SQL = `
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS products (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL
);

CREATE TABLE IF NOT EXISTS orders (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id),
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS notifications (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, email) VALUES
('john_doe', 'john@example.com'),
('jane_smith', 'jane@example.com'),
('alice_jones', 'alice@example.com');

INSERT INTO products (name, price) VALUES
('Product A', 19.99),
('Product B', 29.99),
('Product C', 39.99);

INSERT INTO orders (user_id, product_id, status) VALUES
(1, 1, 'Preperation'),
(2, 2, 'Preperation'),
(1, 1, 'Shipped');

INSERT INTO notifications (order_id) VALUES
(1),
(2),
(3);
`;

async function main() {
    console.log("seeding...");
    const conString = `postgres://${process.env.DBUSER}:${process.env.DBPASS}@${process.env.DBHOST}:${process.env.DBPORT}/${process.env.DB}`;
    console.log(conString);
    const client = new Client({
        connectionString: conString,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}

main();