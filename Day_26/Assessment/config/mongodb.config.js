const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillsphere';

async function connectMongoDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✓ MongoDB connected successfully');
        return true;
    } catch (error) {
        console.error('✗ MongoDB connection failed:', error.message);
        return false;
    }
}

// Handle connection events
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = { connectMongoDB, mongoose };
