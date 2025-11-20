const express = require("express");
const router = express.Router();
const validateCourseId = require("../middleware/validateCourseId");

// Render HTML page with all courses
router.get("/", (req, res) => {
    const courseList = [
        { name: "React Mastery", duration: "6 weeks" },
        { name: "Node.js Bootcamp", duration: "4 weeks" },
        { name: "MongoDB Essentials", duration: "3 weeks" }
    ];

    res.render("courses", { courses: courseList });
});

// Dynamic route for course by ID
router.get("/:id", validateCourseId, (req, res) => {
    const { id } = req.params;

    res.json({
        id,
        name: "React Mastery",
        duration: "6 weeks"
    });
});

module.exports = router;
