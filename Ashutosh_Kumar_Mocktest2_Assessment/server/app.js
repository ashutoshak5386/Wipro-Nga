require('dotenv').config();
const express = require('express');
const cors = require('cors');
const loggerMiddleware = require('./middleware/loggerMiddleware');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

// Global Middleware
app.use(loggerMiddleware);

// Routes
app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/', authRoutes); // Login and Dashboard are at root level in original app

app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
