# SkillSphere - Database Connectivity

Day 26 implementation of persistent storage for SkillSphere using MySQL, MongoDB, and Sequelize ORM.

## 📋 Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Challenges](#challenges)
- [Usage](#usage)
- [Database Schemas](#database-schemas)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This project demonstrates three different database integration approaches:

1. **Challenge 1 (Easy)**: MySQL integration using `mysql2` package
2. **Challenge 2 (Average)**: MongoDB integration using Mongoose ODM
3. **Challenge 3 (Difficult)**: Sequelize ORM with relational database modeling

## 📦 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher)
- **MySQL Server** (v5.7 or higher) running on `localhost:3306`
- **MongoDB Server** (v4.4 or higher) running on `localhost:27017`
- **npm** or **yarn** package manager

### Installing Database Servers

**MySQL:**
- Windows: Download from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)
- Mac: `brew install mysql`
- Linux: `sudo apt-get install mysql-server`

**MongoDB:**
- Windows: Download from [MongoDB Downloads](https://www.mongodb.com/try/download/community)
- Mac: `brew install mongodb-community`
- Linux: `sudo apt-get install mongodb`

## 🚀 Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd "c:\Users\ashut\OneDrive\Desktop\Wipro NGA\Day_26\Assessment"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create MySQL database:**
   ```bash
   mysql -u root -p < scripts/init-mysql.sql
   ```
   Or manually:
   ```sql
   CREATE DATABASE skillsphere_db;
   ```

## ⚙️ Configuration

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update `.env` with your database credentials:**
   ```env
   # MySQL Configuration
   MYSQL_HOST=localhost
   MYSQL_USER=root
   MYSQL_PASSWORD=your_password
   MYSQL_DATABASE=skillsphere_db
   MYSQL_PORT=3306

   # MongoDB Configuration
   MONGODB_URI=mongodb://localhost:27017/skillsphere

   # Node Environment
   NODE_ENV=development
   ```

## 🎓 Challenges

### Challenge 1: MySQL Integration (Easy)

**Objective:** Store course information in MySQL using mysql2 package.

**Features:**
- Connection pooling for efficient database access
- Automatic table creation
- Course data insertion with validation
- Console confirmation of successful operations

**Run:**
```bash
npm run challenge1
```

**Expected Output:**
```
✓ MySQL connected successfully
✓ Courses table created/verified
✓ INSERT INTO courses successful
  Course ID: 1
  Title: Full Stack Web Development
  Duration: 120 hours
  ...
```

---

### Challenge 2: MongoDB Integration (Average)

**Objective:** Retrieve user and enrollment data from MongoDB using Mongoose.

**Features:**
- Mongoose schema definitions with validation
- User and Enrollment models with relationships
- Population of referenced documents
- Comprehensive enrollment details display
- Summary statistics

**Run:**
```bash
npm run challenge2
```

**Expected Output:**
```
✓ MongoDB connected successfully
✓ Created 3 users
✓ Created 5 enrollments

=== Enrollment Details ===
Enrollment #1:
  Student: Alice Johnson
  Email: alice@example.com
  Course: Full Stack Web Development (COURSE001)
  Status: ACTIVE
  Progress: 45%
  ...
```

---

### Challenge 3: Sequelize ORM (Difficult)

**Objective:** Implement One-to-Many relationship between Instructor and Courses using Sequelize.

**Features:**
- Sequelize model definitions with validations
- One-to-Many relationship (Instructor hasMany Courses)
- Eager loading with `include`
- Cascade operations
- Comprehensive queries demonstrating relationships

**Run:**
```bash
npm run challenge3
```

**Expected Output:**
```
✓ Sequelize connected to MySQL successfully
✓ Database synchronized successfully
✓ Created 3 instructors
✓ Created 7 courses

=== Courses by Instructor: sarah.mitchell@skillsphere.com ===
Instructor Details:
  Name: Dr. Sarah Mitchell
  Department: Computer Science
  Experience: 15 years

Courses Taught: 3
1. Advanced JavaScript Programming
   Level: ADVANCED
   Duration: 40 hours
   ...
```

## 📊 Database Schemas

### MySQL - Courses Table (Challenge 1)

```sql
CREATE TABLE courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  duration INT NOT NULL,
  instructor VARCHAR(255),
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### MongoDB - Collections (Challenge 2)

**Users Collection:**
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required),
  enrolledCourses: [String],
  role: String (enum: student/instructor/admin),
  createdAt: Date,
  timestamps: true
}
```

**Enrollments Collection:**
```javascript
{
  userId: ObjectId (ref: User),
  courseId: String (required),
  courseName: String (required),
  enrollmentDate: Date,
  status: String (enum: active/completed/dropped/pending),
  progress: Number (0-100),
  completionDate: Date,
  timestamps: true
}
```

### Sequelize - Tables (Challenge 3)

**Instructors Table:**
```javascript
{
  id: INTEGER (PK, Auto Increment),
  name: STRING (required),
  email: STRING (required, unique),
  department: STRING,
  bio: TEXT,
  experience: INTEGER,
  timestamps: true
}
```

**Sequelize_Courses Table:**
```javascript
{
  id: INTEGER (PK, Auto Increment),
  title: STRING (required),
  description: TEXT,
  duration: INTEGER (required),
  level: ENUM (beginner/intermediate/advanced),
  price: DECIMAL(10, 2),
  instructorId: INTEGER (FK -> instructors.id),
  timestamps: true
}
```

**Relationship:**
- One Instructor → Many Courses (One-to-Many)
- Foreign Key: `instructorId` in courses table

## ✅ Best Practices Implemented

### 1. Security
- ✅ Database credentials stored in `.env` file
- ✅ `.gitignore` configured to exclude sensitive files
- ✅ Environment variables for all configurations
- ✅ Password validation in models

### 2. Database Design
- ✅ Proper indexing for frequent queries
- ✅ Foreign key constraints with cascade operations
- ✅ Normalized data in SQL databases
- ✅ Appropriate data types and validations

### 3. Code Quality
- ✅ Connection pooling for efficiency
- ✅ Comprehensive error handling
- ✅ Async/await for cleaner code
- ✅ Modular configuration files
- ✅ Clear console output with status indicators

### 4. Schema Management
- ✅ Sequelize sync for schema evolution
- ✅ Mongoose schema validation
- ✅ Timestamps for audit trails
- ✅ Proper relationship definitions

## 🔧 Troubleshooting

### MySQL Connection Issues

**Error:** `ER_ACCESS_DENIED_ERROR`
```bash
# Solution: Update MySQL credentials in .env file
MYSQL_USER=your_username
MYSQL_PASSWORD=your_password
```

**Error:** `ER_BAD_DB_ERROR: Unknown database`
```bash
# Solution: Create the database
mysql -u root -p
CREATE DATABASE skillsphere_db;
```

### MongoDB Connection Issues

**Error:** `MongoServerError: connect ECONNREFUSED`
```bash
# Solution: Start MongoDB service
# Windows:
net start MongoDB

# Mac/Linux:
sudo systemctl start mongod
```

**Error:** `MongooseServerSelectionError`
```bash
# Solution: Check MongoDB is running
# Windows:
sc query MongoDB

# Mac/Linux:
sudo systemctl status mongod
```

### Common Issues

**Port Already in Use:**
```bash
# Check what's using the port
# Windows:
netstat -ano | findstr :3306

# Mac/Linux:
lsof -i :3306
```

**Dependencies Not Installing:**
```bash
# Clear npm cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## 📁 Project Structure

```
Assessment/
├── config/
│   ├── mysql.config.js       # MySQL connection configuration
│   ├── mongodb.config.js     # MongoDB connection configuration
│   └── sequelize.config.js   # Sequelize ORM configuration
├── models/
│   ├── User.js               # Mongoose User model
│   ├── Enrollment.js         # Mongoose Enrollment model
│   ├── Instructor.js         # Sequelize Instructor model
│   ├── Course.js             # Sequelize Course model
│   └── index.js              # Model relationships
├── scripts/
│   └── init-mysql.sql        # MySQL database initialization
├── challenge1-mysql.js       # Challenge 1 implementation
├── challenge2-mongodb.js     # Challenge 2 implementation
├── challenge3-sequelize.js   # Challenge 3 implementation
├── package.json              # Project dependencies
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
└── README.md                 # This file
```

## 🎯 Learning Outcomes

After completing this project, you will understand:

1. **MySQL Integration:**
   - Using mysql2 with promises
   - Connection pooling
   - Raw SQL queries
   - Transaction handling

2. **MongoDB & Mongoose:**
   - Schema definitions
   - Model relationships
   - Population (joins)
   - Validation and middleware

3. **Sequelize ORM:**
   - Model definitions
   - Associations (One-to-Many)
   - Eager loading
   - Migrations and sync

4. **Best Practices:**
   - Environment configuration
   - Error handling
   - Security considerations
   - Code organization

## 📝 License

This project is part of the Wipro NGA training program.

## 👨‍💻 Author

Day 26 Assessment - Database Connectivity Implementation

---

**Happy Coding! 🚀**
