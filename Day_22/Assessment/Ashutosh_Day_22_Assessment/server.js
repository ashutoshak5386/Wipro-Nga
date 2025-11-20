require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/User");
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// DB connect
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

// Passport strategy
passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        const user = await User.findOne({ email });
        if (!user) return done(null, false);

        const match = await bcrypt.compare(password, user.password);
        if (!match) return done(null, false);

        return done(null, user);
    })
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    const u = await User.findById(id);
    done(null, u);
});

// Routes
app.get("/register", (req, res) => res.sendFile(__dirname + "/views/register.html"));
app.get("/login", (req, res) => res.sendFile(__dirname + "/views/login.html"));

app.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, role });

    res.send(`Registration successful for ${name}`);
});

// login
// login
app.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            return res.send(`
                <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                    <h2 style="color: red;">Login Failed</h2>
                    <p>Wrong email or password.</p>
                    <a href="/login">Try Again</a>
                </div>
            `);
        }

        req.logIn(user, (err) => {
            if (err) return next(err);

            console.log(`Login attempt: Email=${user.email}, Role in DB=${user.role}, Role in Request=${req.body.role}`);

            // Check role
            if (req.body.role !== user.role) {
                req.logout(() => {
                    res.send(`
                        <div style="font-family: sans-serif; text-align: center; margin-top: 50px;">
                            <h1 style="color: red;">Access Denied</h1>
                            <p>Role Mismatch: You tried to login as <strong>${req.body.role}</strong>, but your account is registered as <strong>${user.role}</strong>.</p>
                            <a href="/login">Try Again</a>
                        </div>
                    `);
                });
                return;
            }

            const welcomeHtml = (roleName, userName) => `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome ${roleName}</title>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
                    <style>
                        body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI', sans-serif; }
                        .card { background: rgba(255, 255, 255, 0.95); color: #333; border: none; border-radius: 15px; padding: 3rem; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3); min-width: 350px; }
                        h1 { font-weight: 700; color: #4a4a4a; }
                    </style>
                </head>
                <body>
                    <div class="card">
                        <h1>Welcome, ${roleName}!</h1>
                        <p class="lead text-muted">Logged in as ${userName}</p>
                        <hr class="my-4">
                        <a href="/logout" class="btn btn-danger btn-lg w-100">Logout</a>
                        ${roleName === 'Admin' ? '<div class="mt-3"><a href="/admin" class="btn btn-outline-dark w-100">Go to Admin Panel</a></div>' : ''}
                    </div>
                </body>
                </html>
            `;

            if (user.role === "admin") {
                return res.send(welcomeHtml("Admin", user.name));
            } else {
                return res.send(welcomeHtml("User", user.name));
            }
        });
    })(req, res, next);
});

// Logout route
app.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect("/login");
    });
});

// Protected admin route
function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === "admin") return next();
    return res.status(403).send("Access Denied");
}

app.get("/admin", isAdmin, (req, res) => {
    res.send("Welcome, Admin!");
});

app.listen(3000, () => console.log("Server running on 3000"));
