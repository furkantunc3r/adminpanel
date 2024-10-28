const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const getAllNotifications = asyncHandler(async (req, res, next) => {
    let notifications = [];

    try {
        notifications = await db.getAllNotifications();
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'Could not get notifications'
        });
    }

    return res.json(notifications);
});

module.exports = {
    getAllNotifications
};