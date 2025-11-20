const express = require("express");
const path = require("path");
const app = express();

// Middleware imports
const logger = require("./middleware/logger");

// Route imports
const homeRoute = require("./routes/home");
const courseRoute = require("./routes/courses");
const userRoute = require("./routes/users");

// Global middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// View engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // FIXED!!

// Routes
app.use("/", homeRoute);
app.use("/courses", courseRoute);
app.use("/users", userRoute);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
