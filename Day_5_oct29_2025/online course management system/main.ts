// Main entry point for the Online Course Management System
import { CourseManager, CourseCategory } from './courseApp';

// Create an instance of CourseManager
const courseManager = new CourseManager();

console.log("=== Online Course Management System Demo ===\n");

// Add instructors
console.log("--- Adding Instructors ---");
const instructor1 = courseManager.addInstructor("John Doe", [CourseCategory.DEVELOPMENT]);
const instructor2 = courseManager.addInstructor("Jane Smith", [CourseCategory.MARKETING, CourseCategory.BUSINESS]);
const instructor3 = courseManager.addInstructor("Mike Johnson", [CourseCategory.DESIGN]);

// Add students
console.log("\n--- Adding Students ---");
const student1 = courseManager.addStudent("Alice Smith");
const student2 = courseManager.addStudent("Bob Wilson");
const student3 = courseManager.addStudent("Carol Davis");
const student4 = courseManager.addStudent("David Brown");

// Create courses
console.log("\n--- Creating Courses ---");
const course1 = courseManager.createCourse("TypeScript Basics", CourseCategory.DEVELOPMENT, instructor1.id);
const course2 = courseManager.createCourse("Advanced JavaScript", CourseCategory.DEVELOPMENT, instructor1.id);
const course3 = courseManager.createCourse("Digital Marketing Strategy", CourseCategory.MARKETING, instructor2.id);
const course4 = courseManager.createCourse("UI/UX Design Fundamentals", CourseCategory.DESIGN, instructor3.id);

// Enroll students in courses
console.log("\n--- Enrolling Students ---");
courseManager.enrollStudent(course1.id, student1.id);
courseManager.enrollStudent(course1.id, student2.id);
courseManager.enrollStudent(course2.id, student1.id);
courseManager.enrollStudent(course3.id, student2.id);
courseManager.enrollStudent(course3.id, student3.id);
courseManager.enrollStudent(course4.id, student3.id);
courseManager.enrollStudent(course4.id, student4.id);

// Try to enroll the same student again (should show warning)
console.log("\n--- Testing Duplicate Enrollment ---");
courseManager.enrollStudent(course1.id, student1.id);

// Print summary using the iterator pattern
console.log("\n--- System Summary ---");
courseManager.printSummary();

// Fetch and display all courses
console.log("\n--- All Courses List ---");
const allCourses = courseManager.getAllCourses();
allCourses.forEach(course => {
    console.log(`Course ID: ${course.id}, Title: ${course.title}, Category: ${course.category}`);
});

// Fetch and display detailed course information
console.log("\n--- Detailed Course Information ---");
const courseDetails = courseManager.getCourseDetails(course1.id);
if (courseDetails) {
    console.log(`\nCourse: ${courseDetails.course.title}`);
    console.log(`Category: ${courseDetails.course.category}`);
    console.log(`Instructor: ${courseDetails.instructor?.name || "Not assigned"}`);
    console.log(`Enrolled Students (${courseDetails.students.length}):`);
    courseDetails.students.forEach(student => {
        console.log(`  - ${student.name}`);
    });
}

// Demonstrate generator/iterator usage
console.log("\n--- Using Generators to Iterate Over Students ---");
for (const student of courseManager.studentIterator()) {
    console.log(`Student: ${student.name}, ID: ${student.id}, Courses: ${student.enrolledCourses.length}`);
}

console.log("\n=== Demo Complete ===");