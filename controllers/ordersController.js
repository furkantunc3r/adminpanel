const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const placeOrder = asyncHandler(async (req, res, next, io) => {
    const {
        userId,
        productId
    } = req.body;
    let newOrder = {};

    try {
        newOrder = await db.placeOrder(userId, productId);

        if (newOrder) {
            const orderedProduct = await db.getSingleProduct(productId);
            const orderingUser = await db.getUserInformation(userId);

            newOrder.orderingUserName = orderingUser.name;
            newOrder.productName = orderedProduct.name;

            io.emit('newOrder', newOrder);
        }
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Could not place order'
        });
    }

    return res.status(200).json(newOrder);
});

const getAllOrders = asyncHandler(async (req, res, next) => {
    let orders = [];

    try {
        orders = await db.getAllOrders();
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Could not get orders'
        });
    }

    return res.status(200).json(orders);
});

const updateOrder = asyncHandler(async (req, res, next) => {
    const {
        orderId,
        newStatus
    } = req.body;
    let order = {};

    try {
        order = await db.updateOrder(orderId, newStatus);
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Could not update order'
        });
    }

    return res.status(200).json(order);
});

const deleteOrder = asyncHandler(async (req, res, next) => {
    const {
        orderId,
    } = req.body;

    try {
        await db.deleteOrder(orderId);
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Could not delete order'
        });
    }

    return res.status(200).json({
        message: "Successfully Deleted"
    });
});


module.exports = {
    placeOrder,
    getAllOrders,
    updateOrder,
    deleteOrder
};