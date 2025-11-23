const { users } = require('../config/db');

exports.getUserById = (req, res) => {
    const user = users.find((u) => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};
