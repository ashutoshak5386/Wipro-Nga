// In this file we will implement following features:
// 1. Setup an Express server
// 2. Create a simple GET endpoint
// Middleware is used for parsing JSON request bodies
// 3. Error handling for unknown routes
// DB setup i.e. mongoose for MongoDB connection
// Serving Static HTML form 
// Post route to handle form submission, validate input and save to DB
// Displaying message on successful submission, validation errors etc

// server.js

// 1. Import required modules
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 2. Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 3. Serve static HTML from public folder
app.use(express.static(path.join(__dirname, 'public')));

// 4. Connect MongoDB
mongoose.connect("mongodb://localhost:27017/formDB")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// 5. Load Routes
const formRoutes = require('./routes/formRoutes');
app.use('/', formRoutes);   // all form related routes

// 6. 404 route for unknown paths
app.use((req, res) => {
    res.status(404).send("Sorry! Route not found");
});

// 7. Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
