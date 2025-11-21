// routes/formRoutes.js

const express = require('express');
const router = express.Router();

const { body, validationResult } = require("express-validator");
const mongoose = require('mongoose');

// Mongoose Schema & Model
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});
const Form = mongoose.model("Form", formSchema);

// GET test route
router.get('/api', (req, res) => {
    res.send("Hello, this is the GET endpoint!");
});

// POST route for form submission
router.post('/submit-form',

    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid Email required"),
        body("message").notEmpty().withMessage("Message is required")
    ],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, message } = req.body;

        try {
            const newForm = new Form({ name, email, message });
            await newForm.save();

            res.status(201).json({ message: "Form submitted successfully" });

        } catch (err) {
            res.status(500).json({ error: "Failed to submit" });
        }
    }
);

// Export router
module.exports = router;
