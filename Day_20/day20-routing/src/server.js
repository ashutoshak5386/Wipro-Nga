const express = require("express");
const app = express();

const homeRoute = require("./routes/home");
const courseRoute = require("./routes/courses");

app.use("/", homeRoute);
app.use("/courses", courseRoute);

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
