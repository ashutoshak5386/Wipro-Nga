// in this file we will set up our server using Express framework along with routes and passport for authentication
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// configure session middleware
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Dummy users (for demo)
const users = [
    { id: 1, username: 'testuser', password: 'testpass' },
    { id: 2, username: 'admin', password: 'adminpass' }
];

// Configure passport local strategy
passport.use(new LocalStrategy(
    function (username, password, done) {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'Incorrect username or password.' });
        }
    }
));

// Serialize user
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(function (id, done) {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Home page
app.get('/', (req, res) => {
    res.send(`<h1>Home Page</h1>
        <p>Welcome ${req.user ? req.user.username : 'Guest'}!</p>
        <a href="/login">Login</a> | 
        <a href="/logout">Logout</a>
    `);
});

// Login page
app.get('/login', (req, res) => {
    res.send(`
        <h1>Login Page</h1>
        <form method="post" action="/login">
            <div>
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    `);
});

// Handle login
app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/');
    }
);

// Logout
app.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

// Protected route example (optional)
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Above code can be implemented susing below steps :
// 1. Set up an Express server.
// 2. Configure body-parser to parse form data.
// 3. Set up express-session for session management.    
// 4. Configure Passport.js with a local strategy for username-password authentication.
// 5. Create routes for login, logout, and a protected home page.
// 6. Use middleware to protect routes that require authentication.
// 7. Start the server and listen on a specified port.