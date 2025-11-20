const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = 3000;

// ------------------ Built-in Middleware ------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------------ Morgan Middleware ------------------
app.use(morgan('dev')); // logs method, URL, status, response time

// ------------------ Custom Middleware: Request Logger ------------------
const requestLogger = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next(); // must call next() to continue
};
app.use(requestLogger);

// ------------------ Custom Middleware: Validation ------------------
const validateStudent = (req, res, next) => {
    const { name, email } = req.body;
    if (!name || !email) {
        const err = new Error('Validation Failed: Name and Email are required.');
        err.status = 400;
        return next(err); // pass to error handler
    }
    next();
};

// ------------------ Template Engine ------------------
app.set('view engine', 'ejs');

// ------------------ Sample Data ------------------
let students = [
    { id: 1, name: 'Aarav Sharma', email: 'aarav@skilltrack.com', progress: 85 },
    { id: 2, name: 'Riya Patel', email: 'riya@skilltrack.com', progress: 72 },
    { id: 3, name: 'Kabir Mehta', email: 'kabir@skilltrack.com', progress: 95 },
];

// ------------------ Routes ------------------

// Home route
app.get('/', (req, res) => {
    res.send('<h2>Welcome to SkillTrack Academy Dashboard</h2><a href="/students">View Students</a>');
});

// View students (dynamic EJS page)
app.get('/students', (req, res) => {
    res.render('students', { students });
});

// Add student (POST route with validation)
app.post('/students', validateStudent, (req, res) => {
    const { name, email, progress } = req.body;
    const newStudent = { id: students.length + 1, name, email, progress: progress || 0 };
    students.push(newStudent);
    res.status(201).send({ message: 'Student added successfully!', student: newStudent });
});

// Simulated error route
app.get('/error', (req, res, next) => {
    try {
        throw new Error('Unexpected Server Error');
    } catch (err) {
        next(err); // forward to error handler
    }
});

// ------------------ Error Handling Middleware ------------------
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(err.status || 500).json({
        status: 'error',
        message: err.status ? err.message : 'Internal Server Error. Please try again later.'
    });
});

// ------------------ Start Server ------------------
app.listen(PORT, () => {
    console.log(`✅ SkillTrack Dashboard running at http://localhost:${PORT}`);
});
