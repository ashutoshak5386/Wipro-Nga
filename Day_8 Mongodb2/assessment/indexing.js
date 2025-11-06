// Connect using Mongo shell or Node.js MongoClient
use("BookVerseDB");

// Before indexing
db.books.find({ genre: "Fiction" }).explain("executionStats");

// Create indexes
db.books.createIndex({ genre: 1 });
db.books.createIndex({ "ratings.score": 1 });
db.books.createIndex({ authorId: 1 });

// Compare performance again
db.books.find({ genre: "Fiction" }).explain("executionStats");

// Drop an unnecessary index
db.books.dropIndex({ "ratings.score": 1 });
