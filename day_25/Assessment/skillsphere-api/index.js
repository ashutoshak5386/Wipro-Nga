const express = require("express");
const app = express();

app.use(express.json());

app.get("/status", (req, res) => {
  res.send("App is live");
});

// Dummy routes for courses
app.get("/api/courses", (req, res) => {
  res.json([{ id: 1, name: "Node.js Basics" }]);
});

// Dummy user routes
app.post("/api/users", (req, res) => {
  const { name } = req.body;
  res.status(201).json({ message: "User created", name });
});

module.exports = app;
