const express = require("express");
const router = express.Router();
const validateCourseId = require("../middleware/validateCourseId");

router.get("/:id", validateCourseId, (req, res) => {
    const { id } = req.params;

    res.json({
        id,
        name: "React Mastery",
        duration: "6 weeks"
    });
});

module.exports = router;
