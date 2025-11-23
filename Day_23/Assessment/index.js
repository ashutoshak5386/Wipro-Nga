const express = require("express");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");

const app = express();
app.use(express.json());

// Rate Limiter Configuration
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,    // 1 minute
    max: 5,                     // 5 requests per minute
    message: { error: "Too many requests" }
});
app.use(limiter);

// In-Memory Database
let courses = [
    { id: 1, name: "Node Basics", duration: "4 weeks" },
    { id: 2, name: "React Fundamentals", duration: "6 weeks" }
];

// Validation Middleware
const validateCourse = [
    body("name").notEmpty().withMessage("Course name is required"),
    body("duration").notEmpty().withMessage("Duration is required")
];

// Root Route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to the Course Management API",
        endpoints: {
            courses: base
        }
    });
});

// API Routes
const base = "/api/v1/courses";

// GET all courses
app.get(base, (req, res) => {
    res.json(courses);
});

// POST new course
app.post(base, validateCourse, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { name, duration } = req.body;
    const newCourse = { id: Date.now(), name, duration };
    courses.push(newCourse);
    res.status(201).json(newCourse);
});

// PUT update course
app.put(`${base}/:id`, validateCourse, (req, res) => {
    const id = Number(req.params.id);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }

    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: "Course not found" });

    courses[index] = { id, ...req.body };
    res.json(courses[index]);
});

// DELETE course
app.delete(`${base}/:id`, (req, res) => {
    const id = Number(req.params.id);
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) return res.status(404).json({ error: "Course not found" });

    const deleted = courses.splice(index, 1);
    res.json({ message: "Course deleted", deleted });
});

// Central Error Handler
app.use((err, req, res, next) => {
    res.status(500).json({ error: "Something went wrong on the server" });
});

// Start Server
const server = app.listen(3000, () => console.log("Server running on port 3000"));

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error('Error: Port 3000 is already in use. Please stop any other server running on this port.');
    } else {
        console.error('Server error:', err);
    }
});
