const { sequelize } = require('../config/sequelize.config');
const Instructor = require('./Instructor');
const Course = require('./Course');

// Define relationships
// One-to-Many: Instructor has many Courses
Instructor.hasMany(Course, {
    foreignKey: 'instructorId',
    as: 'courses',
    onDelete: 'CASCADE'
});

// Course belongs to Instructor
Course.belongsTo(Instructor, {
    foreignKey: 'instructorId',
    as: 'instructor'
});

module.exports = {
    sequelize,
    Instructor,
    Course
};
