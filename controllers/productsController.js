const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const getAllProducts = asyncHandler(async (req, res, next) => {
    try {
        const products = await db.getAllProducts();

        res.render('products', {
            products: products
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Could not get products'
        });
    }
});

module.exports = {
    getAllProducts
};