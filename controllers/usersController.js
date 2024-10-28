const asyncHandler = require('express-async-handler');
const db = require('../db/queries');

const registerOrLoginUser = asyncHandler(async (req, res, next) => {
    const {
        name,
        email
    } = req.body

    try {
        const user = await db.getUserWithEmail(email);

        if (user) {
            res.json({
                message: "User Exists!",
                user: user
            });
        } else {
            const newUser = await db.createNewUser(name, email);

            res.json({
                message: "Created a new user!",
                user: newUser
            });
        }
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: 'User Error'
        });
    }
});

module.exports = {
    registerOrLoginUser
};