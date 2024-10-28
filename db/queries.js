const pool = require('./pool');

async function getAllProducts() {
    let allProducts = [];

    try {
        allProducts = (await pool.query('SELECT * FROM products')).rows;
    } catch (error) {
        console.log(error);

        return;
    }

    return allProducts;
};

async function getSingleProduct(productId) {
    let product = {};

    try {
        product = (await pool.query('SELECT * FROM products WHERE id = $1', [productId])).rows[0];
    } catch (error) {
        console.log(error);

        return;
    }

    return product;
};

async function placeOrder(userId, productId) {
    let newOrder = {};

    try {
        newOrder = (await pool.query(`INSERT INTO orders (user_id, product_id, status) VALUES ($1, $2, 'New Order') RETURNING *`, [userId, productId])).rows[0];

        await pool.query('INSERT INTO notifications (order_id) VALUES ($1)', [newOrder.id]);
    } catch (error) {
        console.log(error);

        return;
    }

    return newOrder;
};

async function getAllOrders() {
    let orders = [];

    try {
        orders = (await pool.query(`SELECT * FROM orders`)).rows;
    } catch (error) {
        console.log(error);

        return;
    }

    return orders;
};

async function updateOrder(orderId, newStatus) {
    let order = {};

    try {
        order = (await pool.query("UPDATE orders SET status = $1 WHERE id = $2 RETURNING *", [newStatus, orderId])).rows[0];
    } catch (error) {
        console.log(error);

        return;
    }

    return order;
};

async function deleteOrder(orderId) {
    try {
        await pool.query("DELETE FROM notifications WHERE order_id = $1", [orderId]);
        await pool.query("DELETE FROM orders WHERE id = $1", [orderId]);
    } catch (error) {
        console.log(error);

        return;
    }

    return;
};

async function getAllNotifications() {
    let notifications = [];

    try {
        notifications = (await pool.query(`SELECT * FROM notifications`)).rows;
    } catch (error) {
        console.log(error);

        return;
    }

    return notifications;
};

async function getUserInformation(userId) {
    let user = {};

    try {
        user = (await pool.query(`SELECT * FROM users WHERE id = $1`, [userId])).rows[0];
    } catch (error) {
        console.log(error);

        return;
    }

    return user;
};

async function getUserWithEmail(email) {
    let user = {};

    try {
        user = (await pool.query(`SELECT * FROM users WHERE email = $1`, [email])).rows[0];
    } catch (error) {
        console.log(error);

        return;
    }

    return user;
};

async function createNewUser(name, email) {
    let user = {};

    try {
        user = (await pool.query(`INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *`, [name, email])).rows[0];
    } catch (error) {
        console.log(error);

        return;
    }

    return user;
};

module.exports = {
    getAllProducts,
    placeOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
    getAllNotifications,
    getSingleProduct,
    getUserInformation,
    getUserWithEmail,
    createNewUser
};