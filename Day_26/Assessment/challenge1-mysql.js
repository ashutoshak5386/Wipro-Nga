const { pool, testConnection } = require('./config/mysql.config');

// Challenge 1: MySQL Integration - Insert Course Data

async function createCoursesTable() {
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS courses (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      duration INT NOT NULL COMMENT 'Duration in hours',
      instructor VARCHAR(255),
      price DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;

    try {
        await pool.query(createTableQuery);
        console.log('✓ Courses table created/verified');
    } catch (error) {
        console.error('✗ Error creating courses table:', error.message);
        throw error;
    }
}

async function insertCourse(courseData) {
    const insertQuery = `
    INSERT INTO courses (title, description, duration, instructor, price)
    VALUES (?, ?, ?, ?, ?)
  `;

    const values = [
        courseData.title,
        courseData.description,
        courseData.duration,
        courseData.instructor,
        courseData.price
    ];

    try {
        const [result] = await pool.query(insertQuery, values);
        return result;
    } catch (error) {
        console.error('✗ Error inserting course:', error.message);
        throw error;
    }
}

async function main() {
    console.log('\n=== Challenge 1: MySQL Integration ===\n');

    // Test connection
    const isConnected = await testConnection();
    if (!isConnected) {
        console.error('Cannot proceed without database connection');
        process.exit(1);
    }

    // Create table
    await createCoursesTable();

    // Sample course data
    const courses = [
        {
            title: 'Full Stack Web Development',
            description: 'Learn HTML, CSS, JavaScript, Node.js, and React to build modern web applications',
            duration: 120,
            instructor: 'John Doe',
            price: 4999.99
        },
        {
            title: 'Data Science with Python',
            description: 'Master data analysis, visualization, and machine learning with Python',
            duration: 80,
            instructor: 'Jane Smith',
            price: 5999.99
        },
        {
            title: 'Mobile App Development',
            description: 'Build cross-platform mobile apps using React Native',
            duration: 60,
            instructor: 'Mike Johnson',
            price: 3999.99
        }
    ];

    // Insert courses
    console.log('Inserting courses into database...\n');

    for (const course of courses) {
        try {
            const result = await insertCourse(course);
            console.log('✓ INSERT INTO courses successful');
            console.log(`  Course ID: ${result.insertId}`);
            console.log(`  Title: ${course.title}`);
            console.log(`  Duration: ${course.duration} hours`);
            console.log(`  Instructor: ${course.instructor}`);
            console.log(`  Price: ₹${course.price}`);
            console.log('');
        } catch (error) {
            console.error(`✗ Failed to insert course: ${course.title}`);
        }
    }

    // Verify insertion by retrieving all courses
    const [allCourses] = await pool.query('SELECT * FROM courses ORDER BY id DESC LIMIT 3');
    console.log('=== Recently Added Courses ===');
    console.table(allCourses.map(c => ({
        ID: c.id,
        Title: c.title,
        Duration: `${c.duration}h`,
        Instructor: c.instructor,
        Price: `₹${c.price}`
    })));

    console.log('\n✓ Challenge 1 completed successfully!\n');

    // Close pool
    await pool.end();
}

// Run the script
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
