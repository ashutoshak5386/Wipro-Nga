const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize.config');

const Instructor = sequelize.define('Instructor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    department: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    experience: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Years of experience'
    }
}, {
    tableName: 'instructors',
    timestamps: true,
    underscored: true
});

module.exports = Instructor;
