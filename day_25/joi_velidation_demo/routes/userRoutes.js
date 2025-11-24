// userRoutes.js is reisponsible for defining user-related routes and applying validation middleware
//Step 1: Import necessary modules including Express, the validation middleware, and any controllers.
//Step 2: Create an Express router instance.
//Step 3: Define routes for user operations (e.g., registration) and apply the validation middleware.
//Step 4: Export the router for use in the main application.


const express = require('express');
const { validateRegister } = require('../joi/joiMiddleware'); // Importing Joi validation middleware
const userController = require('../controllers/userController'); 

const router = express.Router();

// Route for user registration using Joi
router.post('/register', validateRegister, userController.registerUser);

module.exports = router;


