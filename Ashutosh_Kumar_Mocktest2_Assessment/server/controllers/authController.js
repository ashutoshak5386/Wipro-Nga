const jwt = require('jsonwebtoken');

const { users } = require('../config/db');

exports.login = (req, res) => {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

exports.getDashboard = (req, res) => {
    res.json({ message: `Welcome to the dashboard, ${req.user.email}` });
};
