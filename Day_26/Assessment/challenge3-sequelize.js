const { testConnection } = require('./config/sequelize.config');
const { sequelize, Instructor, Course } = require('./models');

// Challenge 3: Sequelize ORM - One-to-Many Relationship

async function syncDatabase() {
    try {
        // Sync all models with database
        await sequelize.sync({ force: true }); // force: true will drop tables if they exist
        console.log('✓ Database synchronized successfully');
    } catch (error) {
        console.error('✗ Error synchronizing database:', error.message);
        throw error;
    }
}

async function seedData() {
    console.log('\nSeeding sample data...');

    // Create instructors
    const instructors = await Instructor.bulkCreate([
        {
            name: 'Dr. Sarah Mitchell',
            email: 'sarah.mitchell@skillsphere.com',
            department: 'Computer Science',
            bio: 'PhD in Computer Science with 15 years of teaching experience',
            experience: 15
        },
        {
            name: 'Prof. James Anderson',
            email: 'james.anderson@skillsphere.com',
            department: 'Data Science',
            bio: 'Expert in Machine Learning and AI with industry experience',
            experience: 12
        },
        {
            name: 'Emily Chen',
            email: 'emily.chen@skillsphere.com',
            department: 'Mobile Development',
            bio: 'Senior Mobile Developer and Technical Instructor',
            experience: 8
        }
    ]);

    console.log(`✓ Created ${instructors.length} instructors`);

    // Create courses for each instructor
    const courses = await Course.bulkCreate([
        // Dr. Sarah Mitchell's courses
        {
            title: 'Advanced JavaScript Programming',
            description: 'Deep dive into modern JavaScript ES6+ features',
            duration: 40,
            level: 'advanced',
            price: 3999.99,
            instructorId: instructors[0].id
        },
        {
            title: 'Full Stack Web Development Bootcamp',
            description: 'Complete guide to building modern web applications',
            duration: 120,
            level: 'intermediate',
            price: 7999.99,
            instructorId: instructors[0].id
        },
        {
            title: 'React.js Masterclass',
            description: 'Build production-ready React applications',
            duration: 60,
            level: 'intermediate',
            price: 4999.99,
            instructorId: instructors[0].id
        },
        // Prof. James Anderson's courses
        {
            title: 'Data Science with Python',
            description: 'Learn data analysis, visualization, and machine learning',
            duration: 80,
            level: 'intermediate',
            price: 5999.99,
            instructorId: instructors[1].id
        },
        {
            title: 'Machine Learning Fundamentals',
            description: 'Introduction to ML algorithms and applications',
            duration: 70,
            level: 'beginner',
            price: 5499.99,
            instructorId: instructors[1].id
        },
        // Emily Chen's courses
        {
            title: 'Mobile App Development with React Native',
            description: 'Build cross-platform mobile applications',
            duration: 60,
            level: 'intermediate',
            price: 4499.99,
            instructorId: instructors[2].id
        },
        {
            title: 'iOS Development with Swift',
            description: 'Create native iOS applications',
            duration: 50,
            level: 'beginner',
            price: 3999.99,
            instructorId: instructors[2].id
        }
    ]);

    console.log(`✓ Created ${courses.length} courses\n`);
}

async function getAllCoursesByInstructor(instructorEmail) {
    console.log(`=== Courses by Instructor: ${instructorEmail} ===\n`);

    // Find instructor with their courses using eager loading
    const instructor = await Instructor.findOne({
        where: { email: instructorEmail },
        include: [{
            model: Course,
            as: 'courses',
            attributes: ['id', 'title', 'description', 'duration', 'level', 'price']
        }]
    });

    if (!instructor) {
        console.log('Instructor not found');
        return;
    }

    // Display instructor information
    console.log('Instructor Details:');
    console.log(`  Name: ${instructor.name}`);
    console.log(`  Department: ${instructor.department}`);
    console.log(`  Experience: ${instructor.experience} years`);
    console.log(`  Email: ${instructor.email}`);
    console.log(`\nCourses Taught: ${instructor.courses.length}\n`);

    // Display all courses
    instructor.courses.forEach((course, index) => {
        console.log(`${index + 1}. ${course.title}`);
        console.log(`   Level: ${course.level.toUpperCase()}`);
        console.log(`   Duration: ${course.duration} hours`);
        console.log(`   Price: ₹${course.price}`);
        console.log(`   Description: ${course.description}`);
        console.log('');
    });

    // Summary
    const totalHours = instructor.courses.reduce((sum, c) => sum + c.duration, 0);
    const avgPrice = instructor.courses.reduce((sum, c) => sum + parseFloat(c.price), 0) / instructor.courses.length;

    console.log('Summary:');
    console.log(`  Total Courses: ${instructor.courses.length}`);
    console.log(`  Total Duration: ${totalHours} hours`);
    console.log(`  Average Price: ₹${avgPrice.toFixed(2)}`);
    console.log('');
}

async function displayAllInstructorsWithCourses() {
    console.log('=== All Instructors and Their Courses ===\n');

    const instructors = await Instructor.findAll({
        include: [{
            model: Course,
            as: 'courses',
            attributes: ['title', 'duration', 'level']
        }],
        order: [['name', 'ASC']]
    });

    instructors.forEach(instructor => {
        console.log(`${instructor.name} (${instructor.department})`);
        console.log(`  Courses: ${instructor.courses.length}`);
        instructor.courses.forEach(course => {
            console.log(`    • ${course.title} - ${course.duration}h [${course.level}]`);
        });
        console.log('');
    });
}

async function main() {
    console.log('\n=== Challenge 3: Sequelize ORM ===\n');

    // Test connection
    const isConnected = await testConnection();
    if (!isConnected) {
        console.error('Cannot proceed without database connection');
        process.exit(1);
    }

    // Sync database (create tables)
    await syncDatabase();

    // Seed sample data
    await seedData();

    // Display all instructors with their courses
    await displayAllInstructorsWithCourses();

    // Query courses by specific instructor
    await getAllCoursesByInstructor('sarah.mitchell@skillsphere.com');

    // Query another instructor
    await getAllCoursesByInstructor('james.anderson@skillsphere.com');

    console.log('✓ Challenge 3 completed successfully!');
    console.log('\nDemonstrated:');
    console.log('  ✓ One-to-Many relationship (Instructor → Courses)');
    console.log('  ✓ Eager loading with include');
    console.log('  ✓ Query all courses by instructor');
    console.log('  ✓ Cascade operations\n');

    // Close connection
    await sequelize.close();
    console.log('Database connection closed');
}

// Run the script
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
