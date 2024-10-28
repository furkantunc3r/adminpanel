const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');

module.exports = (io) => {
    router.get('/', ordersController.getAllOrders);
    router.post('/placeorder', (req, res, next) => {
        ordersController.placeOrder(req, res, next, io);
    });
    router.put('/updateorder', ordersController.updateOrder);
    router.delete('/deleteorder', ordersController.deleteOrder);

    return router;
};