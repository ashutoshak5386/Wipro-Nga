const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create Sequelize instance
const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE || 'skillsphere_db',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD || '',
    {
        host: process.env.MYSQL_HOST || 'localhost',
        port: process.env.MYSQL_PORT || 3306,
        dialect: 'mysql',
        logging: false, // Set to console.log to see SQL queries
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

// Test connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✓ Sequelize connected to MySQL successfully');
        return true;
    } catch (error) {
        console.error('✗ Sequelize connection failed:', error.message);
        return false;
    }
}

module.exports = { sequelize, testConnection };
