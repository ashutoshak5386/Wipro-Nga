// // userController.js

// // User Controller
// Dummy controller for user registration success

module.exports = {
    registerUser: (req, res) => {
        res.status(201).json({
            success: true,
            message: "User registered successfully using Joi middleware",
            data: req.body
        });
    }
};

