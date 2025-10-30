// Step 1: Enum for Course Categories
export enum CourseCategory {
    DEVELOPMENT = "Development",
    DESIGN = "Design",
    MARKETING = "Marketing",
    BUSINESS = "Business"
}

// Step 2: Interfaces
export interface Course {
    id: number;
    title: string;
    category: CourseCategory;
    instructorId: number;
    studentIds: number[];
}

export interface Instructor {
    id: number;
    name: string;
    expertise: CourseCategory[];
}

export interface Student {
    id: number;
    name: string;
    enrolledCourses: number[];
}

export interface CourseDetails {
    course: Course;
    instructor: Instructor | undefined;
    students: Student[];
}

// Tuple type for course enrollment record [courseId, studentId, enrollmentDate]
export type EnrollmentRecord = [number, number, string];

// Step 3: Maps to store data
export const courses: Map<number, Course> = new Map();
export const instructors: Map<number, Instructor> = new Map();
export const students: Map<number, Student> = new Map();
export const enrollmentHistory: EnrollmentRecord[] = [];

// Step 4: Decorator for logging actions
export function LogAction(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Action: ${propertyKey} called with arguments: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
    }
    return descriptor;
}

// Step 5: CourseManager class
export class CourseManager {
    private courseIdCounter: number = 1;

    // Create a new course
    @LogAction
    public createCourse(title: string, category: CourseCategory, instructorId: number): Course {
        const newCourse: Course = {
            id: this.courseIdCounter++,
            title,
            category,
            instructorId,
            studentIds: []
        };
        courses.set(newCourse.id, newCourse);
        return newCourse;
    }

    // Enroll a student into a course
    @LogAction
    public enrollStudent(courseId: number, studentId: number): void {
        const course = courses.get(courseId);
        const student = students.get(studentId);

        if (course && student) {
            if (!course.studentIds.includes(studentId)) {
                course.studentIds.push(studentId);
                student.enrolledCourses.push(courseId);
                // Store enrollment record as tuple
                const enrollmentDate = new Date().toISOString().split('T')[0];
                enrollmentHistory.push([courseId, studentId, enrollmentDate]);
            } else {
                console.log(`Student ${student.name} already enrolled in ${course.title}`);
            }
        } else {
            console.log("Course or Student not found!");
        }
    }

    // Get all courses
    public getAllCourses(): Course[] {
        return Array.from(courses.values());
    }

    // Get course details with instructor and students
    public getCourseDetails(courseId: number): CourseDetails | null {
        const course = courses.get(courseId);
        if (!course) {
            console.log("Course not found!");
            return null;
        }

        const instructor = instructors.get(course.instructorId);
        const enrolledStudents = course.studentIds
            .map(id => students.get(id))
            .filter((s): s is Student => s !== undefined);

        return {
            course,
            instructor,
            students: enrolledStudents
        };
    }

    // Iterator for courses
    public *courseIterator(): IterableIterator<Course> {
        for (const course of courses.values()) {
            yield course;
        }
    }

    // Iterator for instructors
    public *instructorIterator(): IterableIterator<Instructor> {
        for (const instructor of instructors.values()) {
            yield instructor;
        }
    }

    // Iterator for students
    public *studentIterator(): IterableIterator<Student> {
        for (const student of students.values()) {
            yield student;
        }
    }

    // Add instructor
    @LogAction
    public addInstructor(name: string, expertise: CourseCategory[]): Instructor {
        const newInstructor: Instructor = {
            id: instructors.size + 1,
            name,
            expertise
        };
        instructors.set(newInstructor.id, newInstructor);
        return newInstructor;
    }

    // Add student
    @LogAction
    public addStudent(name: string): Student {
        const newStudent: Student = {
            id: students.size + 1,
            name,
            enrolledCourses: []
        };
        students.set(newStudent.id, newStudent);
        return newStudent;
    }

    // Display summary of all data (alias for displaySummary)
    public printSummary(): void {
        this.displaySummary();
    }

    // Display summary of all data
    public displaySummary(): void {
        console.log("\nCourses:");
        for (const course of this.courseIterator()) {
            const instructor = instructors.get(course.instructorId);
            const studentNames = course.studentIds.map(id => students.get(id)?.name || "Unknown");
            console.log(`- ${course.title} (${course.category}) | Instructor: ${instructor?.name} | Students: ${studentNames.join(", ") || "None"}`);
        }

        console.log("\nInstructors:");
        for (const instructor of this.instructorIterator()) {
            console.log(`- ${instructor.name} | Expertise: ${instructor.expertise.join(", ")}`);
        }

        console.log("\nStudents:");
        for (const student of this.studentIterator()) {
            const enrolledTitles = student.enrolledCourses.map(id => courses.get(id)?.title || "Unknown");
            console.log(`- ${student.name} | Enrolled in: ${enrolledTitles.join(", ") || "None"}`);
        }

        console.log("\nEnrollment History (Tuples):");
        enrollmentHistory.forEach(([courseId, studentId, date]) => {
            const course = courses.get(courseId);
            const student = students.get(studentId);
            console.log(`- [${courseId}, ${studentId}, ${date}] => ${student?.name} enrolled in ${course?.title}`);
        });
    }
}