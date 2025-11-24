const { connectMongoDB, mongoose } = require('./config/mongodb.config');
const User = require('./models/User');
const Enrollment = require('./models/Enrollment');

// Challenge 2: MongoDB Integration - Retrieve User and Enrollment Data

async function seedData() {
    // Clear existing data
    await User.deleteMany({});
    await Enrollment.deleteMany({});

    // Create sample users
    const users = await User.create([
        {
            name: 'Alice Johnson',
            email: 'alice@example.com',
            password: 'password123',
            role: 'student'
        },
        {
            name: 'Bob Williams',
            email: 'bob@example.com',
            password: 'password123',
            role: 'student'
        },
        {
            name: 'Carol Davis',
            email: 'carol@example.com',
            password: 'password123',
            role: 'student'
        }
    ]);

    console.log(`✓ Created ${users.length} users`);

    // Create sample enrollments
    const enrollments = await Enrollment.create([
        {
            userId: users[0]._id,
            courseId: 'COURSE001',
            courseName: 'Full Stack Web Development',
            status: 'active',
            progress: 45
        },
        {
            userId: users[0]._id,
            courseId: 'COURSE002',
            courseName: 'Data Science with Python',
            status: 'active',
            progress: 20
        },
        {
            userId: users[1]._id,
            courseId: 'COURSE001',
            courseName: 'Full Stack Web Development',
            status: 'completed',
            progress: 100,
            completionDate: new Date('2024-01-15')
        },
        {
            userId: users[1]._id,
            courseId: 'COURSE003',
            courseName: 'Mobile App Development',
            status: 'active',
            progress: 60
        },
        {
            userId: users[2]._id,
            courseId: 'COURSE002',
            courseName: 'Data Science with Python',
            status: 'active',
            progress: 30
        }
    ]);

    console.log(`✓ Created ${enrollments.length} enrollments\n`);
}

async function retrieveEnrollmentDetails() {
    console.log('=== Enrollment Details ===\n');

    // Retrieve all enrollments with user information using populate
    const enrollments = await Enrollment.find()
        .populate('userId', 'name email role')
        .sort({ enrollmentDate: -1 });

    if (enrollments.length === 0) {
        console.log('No enrollments found');
        return;
    }

    // Display enrollment details
    enrollments.forEach((enrollment, index) => {
        console.log(`Enrollment #${index + 1}:`);
        console.log(`  Student: ${enrollment.userId.name}`);
        console.log(`  Email: ${enrollment.userId.email}`);
        console.log(`  Course: ${enrollment.courseName} (${enrollment.courseId})`);
        console.log(`  Status: ${enrollment.status.toUpperCase()}`);
        console.log(`  Progress: ${enrollment.progress}%`);
        console.log(`  Enrolled On: ${enrollment.enrollmentDate.toLocaleDateString()}`);
        if (enrollment.completionDate) {
            console.log(`  Completed On: ${enrollment.completionDate.toLocaleDateString()}`);
        }
        console.log('');
    });

    // Summary statistics
    console.log('=== Summary Statistics ===');
    const totalEnrollments = enrollments.length;
    const activeEnrollments = enrollments.filter(e => e.status === 'active').length;
    const completedEnrollments = enrollments.filter(e => e.status === 'completed').length;
    const avgProgress = enrollments.reduce((sum, e) => sum + e.progress, 0) / totalEnrollments;

    console.log(`Total Enrollments: ${totalEnrollments}`);
    console.log(`Active: ${activeEnrollments}`);
    console.log(`Completed: ${completedEnrollments}`);
    console.log(`Average Progress: ${avgProgress.toFixed(2)}%`);
    console.log('');
}

async function getEnrollmentsByUser(userEmail) {
    console.log(`=== Enrollments for ${userEmail} ===\n`);

    const user = await User.findOne({ email: userEmail });
    if (!user) {
        console.log('User not found');
        return;
    }

    const enrollments = await Enrollment.find({ userId: user._id });

    console.log(`Student: ${user.name}`);
    console.log(`Total Courses: ${enrollments.length}\n`);

    enrollments.forEach((enrollment, index) => {
        console.log(`${index + 1}. ${enrollment.courseName}`);
        console.log(`   Status: ${enrollment.status} | Progress: ${enrollment.progress}%`);
    });
    console.log('');
}

async function main() {
    console.log('\n=== Challenge 2: MongoDB Integration ===\n');

    // Connect to MongoDB
    const isConnected = await connectMongoDB();
    if (!isConnected) {
        console.error('Cannot proceed without database connection');
        process.exit(1);
    }

    // Seed sample data
    console.log('Seeding sample data...');
    await seedData();

    // Retrieve and display all enrollment details
    await retrieveEnrollmentDetails();

    // Get enrollments for a specific user
    await getEnrollmentsByUser('alice@example.com');

    console.log('✓ Challenge 2 completed successfully!\n');

    // Close connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
}

// Run the script
main().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
});
