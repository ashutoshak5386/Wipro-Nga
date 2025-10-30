"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseManager = exports.enrollmentHistory = exports.students = exports.instructors = exports.courses = exports.CourseCategory = void 0;
exports.LogAction = LogAction;
// Step 1: Enum for Course Categories
var CourseCategory;
(function (CourseCategory) {
    CourseCategory["DEVELOPMENT"] = "Development";
    CourseCategory["DESIGN"] = "Design";
    CourseCategory["MARKETING"] = "Marketing";
    CourseCategory["BUSINESS"] = "Business";
})(CourseCategory || (exports.CourseCategory = CourseCategory = {}));
// Step 3: Maps to store data
exports.courses = new Map();
exports.instructors = new Map();
exports.students = new Map();
exports.enrollmentHistory = [];
// Step 4: Decorator for logging actions
function LogAction(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Action: ${propertyKey} called with arguments: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
    };
    return descriptor;
}
// Step 5: CourseManager class
class CourseManager {
    constructor() {
        this.courseIdCounter = 1;
    }
    // Create a new course
    createCourse(title, category, instructorId) {
        const newCourse = {
            id: this.courseIdCounter++,
            title,
            category,
            instructorId,
            studentIds: []
        };
        exports.courses.set(newCourse.id, newCourse);
        return newCourse;
    }
    // Enroll a student into a course
    enrollStudent(courseId, studentId) {
        const course = exports.courses.get(courseId);
        const student = exports.students.get(studentId);
        if (course && student) {
            if (!course.studentIds.includes(studentId)) {
                course.studentIds.push(studentId);
                student.enrolledCourses.push(courseId);
                // Store enrollment record as tuple
                const enrollmentDate = new Date().toISOString().split('T')[0];
                exports.enrollmentHistory.push([courseId, studentId, enrollmentDate]);
            }
            else {
                console.log(`Student ${student.name} already enrolled in ${course.title}`);
            }
        }
        else {
            console.log("Course or Student not found!");
        }
    }
    // Get all courses
    getAllCourses() {
        return Array.from(exports.courses.values());
    }
    // Get course details with instructor and students
    getCourseDetails(courseId) {
        const course = exports.courses.get(courseId);
        if (!course) {
            console.log("Course not found!");
            return null;
        }
        const instructor = exports.instructors.get(course.instructorId);
        const enrolledStudents = course.studentIds
            .map(id => exports.students.get(id))
            .filter((s) => s !== undefined);
        return {
            course,
            instructor,
            students: enrolledStudents
        };
    }
    // Iterator for courses
    *courseIterator() {
        for (const course of exports.courses.values()) {
            yield course;
        }
    }
    // Iterator for instructors
    *instructorIterator() {
        for (const instructor of exports.instructors.values()) {
            yield instructor;
        }
    }
    // Iterator for students
    *studentIterator() {
        for (const student of exports.students.values()) {
            yield student;
        }
    }
    // Add instructor
    addInstructor(name, expertise) {
        const newInstructor = {
            id: exports.instructors.size + 1,
            name,
            expertise
        };
        exports.instructors.set(newInstructor.id, newInstructor);
        return newInstructor;
    }
    // Add student
    addStudent(name) {
        const newStudent = {
            id: exports.students.size + 1,
            name,
            enrolledCourses: []
        };
        exports.students.set(newStudent.id, newStudent);
        return newStudent;
    }
    // Display summary of all data (alias for displaySummary)
    printSummary() {
        this.displaySummary();
    }
    // Display summary of all data
    displaySummary() {
        console.log("\nCourses:");
        for (const course of this.courseIterator()) {
            const instructor = exports.instructors.get(course.instructorId);
            const studentNames = course.studentIds.map(id => { var _a; return ((_a = exports.students.get(id)) === null || _a === void 0 ? void 0 : _a.name) || "Unknown"; });
            console.log(`- ${course.title} (${course.category}) | Instructor: ${instructor === null || instructor === void 0 ? void 0 : instructor.name} | Students: ${studentNames.join(", ") || "None"}`);
        }
        console.log("\nInstructors:");
        for (const instructor of this.instructorIterator()) {
            console.log(`- ${instructor.name} | Expertise: ${instructor.expertise.join(", ")}`);
        }
        console.log("\nStudents:");
        for (const student of this.studentIterator()) {
            const enrolledTitles = student.enrolledCourses.map(id => { var _a; return ((_a = exports.courses.get(id)) === null || _a === void 0 ? void 0 : _a.title) || "Unknown"; });
            console.log(`- ${student.name} | Enrolled in: ${enrolledTitles.join(", ") || "None"}`);
        }
        console.log("\nEnrollment History (Tuples):");
        exports.enrollmentHistory.forEach(([courseId, studentId, date]) => {
            const course = exports.courses.get(courseId);
            const student = exports.students.get(studentId);
            console.log(`- [${courseId}, ${studentId}, ${date}] => ${student === null || student === void 0 ? void 0 : student.name} enrolled in ${course === null || course === void 0 ? void 0 : course.title}`);
        });
    }
}
exports.CourseManager = CourseManager;
__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Object)
], CourseManager.prototype, "createCourse", null);
__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], CourseManager.prototype, "enrollStudent", null);
__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Object)
], CourseManager.prototype, "addInstructor", null);
__decorate([
    LogAction,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Object)
], CourseManager.prototype, "addStudent", null);
