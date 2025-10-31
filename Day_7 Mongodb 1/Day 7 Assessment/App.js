// Install: npm install mongoose

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/BookVerseDB');

// Define Schemas
const authorSchema = new mongoose.Schema({
  name: String,
  nationality: String,
  birthYear: Number
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  joinDate: Date
});

const bookSchema = new mongoose.Schema({
  title: String,
  genre: String,
  publicationYear: Number,
  authorId: mongoose.Schema.Types.ObjectId,
  ratings: [{
    user: String,
    score: Number,
    comment: String
  }]
});

// Create Models
const Author = mongoose.model('Author', authorSchema);
const User = mongoose.model('User', userSchema);
const Book = mongoose.model('Book', bookSchema);

// Insert Data
async function insertData() {
  try {
    // Insert Authors
    const authors = await Author.insertMany([
      { name: "Isaac Asimov", nationality: "American", birthYear: 1920 },
      { name: "J.K. Rowling", nationality: "British", birthYear: 1965 },
      { name: "Brandon Sanderson", nationality: "American", birthYear: 1975 }
    ]);
    
    console.log('Authors inserted:', authors.length);
    
    // Insert Users
    const users = await User.insertMany([
      { name: "Alice Johnson", email: "alice@example.com", joinDate: new Date("2024-08-15") },
      { name: "Bob Smith", email: "bob@example.com", joinDate: new Date("2024-09-20") },
      { name: "Carol White", email: "carol@example.com", joinDate: new Date("2024-10-01") }
    ]);
    
    console.log('Users inserted:', users.length);
    
    // Insert Books
    const books = await Book.insertMany([
      {
        title: "Foundation",
        genre: "Science Fiction",
        publicationYear: 1951,
        authorId: authors[0]._id,
        ratings: [
          { user: "Alice Johnson", score: 5, comment: "Masterpiece!" }
        ]
      },
      {
        title: "Harry Potter and the Philosopher's Stone",
        genre: "Fantasy",
        publicationYear: 1997,
        authorId: authors[1]._id,
        ratings: [
          { user: "Bob Smith", score: 5, comment: "Magical!" }
        ]
      }
    ]);
    
    console.log('Books inserted:', books.length);
    
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    mongoose.connection.close();
  }
}

insertData();