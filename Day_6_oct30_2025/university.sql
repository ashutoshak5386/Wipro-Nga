
DROP DATABASE university;
CREATE DATABASE university;
USE university;

create TABLE IF NOT EXISTS students (
    student_id VARCHAR(50) PRIMARY KEY,
    StudentName VARCHAR(50) NOT NULL
);

DROP TABLE IF EXISTS students;

INSERT INTO students (student_id,StudentName) VALUES
('S101', 'Asha Gupta'),
('S102', 'Ravi Kumar'),
('S103', 'Neha Singh');

SELECT * FROM students;

CREATE TABLE IF NOT EXISTS courses (
    course_id VARCHAR(50) PRIMARY KEY,
    CourseName VARCHAR(100) NOT NULL
);

INSERT INTO courses (course_id, CourseName) VALUES
('C101', 'Database Management Systems'),
('C102', 'Data Structures and Algorithms'),
('C103', 'Operating Systems');
SELECT * FROM courses;

CREATE TABLE IF NOT EXISTS Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100) NOT NULL
);

INSERT INTO Departments (DepartmentID, DepartmentName) VALUES
(1, 'Computer Science'),
(2, 'Electrical Engineering'),
(3, 'Mechanical Engineering');

SELECT * FROM Departments;

CREATE TABLE IF NOT EXISTS Instructors (
    InstructorID INT PRIMARY KEY,
    InstructorName VARCHAR(100) NOT NULL,
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
);

INSERT INTO Instructors (InstructorID, InstructorName, DepartmentID) VALUES
(101, 'Dr. Anil Sharma', 1),
(102, 'Prof. Meera Joshi', 2),
(103, 'Dr. Rajiv Menon', 3);

SELECT * FROM Instructors;

CREATE TABLE IF NOT EXISTS Enrollments (
    EnrollmentID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID VARCHAR(50),
    CourseID VARCHAR(50),
    EnrollmentDate DATE,
    Grade CHAR(2),
    FOREIGN KEY (StudentID) REFERENCES students(student_id),
    FOREIGN KEY (CourseID) REFERENCES courses(course_id)
);
INSERT INTO Enrollments (StudentID, CourseID, EnrollmentDate, Grade) VALUES
('S101', 'C101', '2023-08-15', 'A'),
('S102', 'C102', '2023-08-16', 'B+'),
('S103', 'C103', '2023-08-17', 'C');

SELECT * FROM Enrollments;