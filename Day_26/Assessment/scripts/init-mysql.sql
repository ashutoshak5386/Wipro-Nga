-- Create database for SkillSphere
CREATE DATABASE IF NOT EXISTS skillsphere_db;

-- Use the database
USE skillsphere_db;

-- Grant privileges (adjust username as needed)
-- GRANT ALL PRIVILEGES ON skillsphere_db.* TO 'root'@'localhost';
-- FLUSH PRIVILEGES;

-- Show confirmation
SELECT 'Database skillsphere_db created successfully!' AS message;
