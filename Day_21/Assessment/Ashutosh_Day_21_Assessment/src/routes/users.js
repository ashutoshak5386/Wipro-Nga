const express = require("express");
const router = express.Router();

let users = [];  // temporary in-memory database

// GET /users → show all users
router.get("/", (req, res) => {
    res.json({
        message: "All Users",
        users
    });
});

// POST /users → add a new user
router.post("/", (req, res) => {
    const newUser = req.body;

    users.push(newUser);   // save data in memory

    res.json({
        message: "User created successfully",
        data: newUser
    });
});

module.exports = router;
