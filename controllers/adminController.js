const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const adminIndex = asyncHandler(async (req, res, next) => {
    try {
        res.render('adminPanel', {
            orders: await db.getAllOrders()
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Could not get orders'
        });
    }
});

module.exports = {
    adminIndex
};