const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    courseId: {
        type: String,
        required: [true, 'Course ID is required']
    },
    courseName: {
        type: String,
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'dropped', 'pending'],
        default: 'active'
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    completionDate: {
        type: Date
    }
}, {
    timestamps: true
});

// Compound index for efficient queries
enrollmentSchema.index({ userId: 1, courseId: 1 });
enrollmentSchema.index({ status: 1 });

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
