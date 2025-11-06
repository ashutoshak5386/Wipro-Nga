// 1. Average rating per book
db.books.aggregate([
  { $unwind: "$ratings" },
  { $group: { _id: "$title", avgRating: { $avg: "$ratings.score" } } }
]);

// 2. Top 3 highest-rated books
db.books.aggregate([
  { $unwind: "$ratings" },
  { $group: { _id: "$title", avgRating: { $avg: "$ratings.score" } } },
  { $sort: { avgRating: -1 } },
  { $limit: 3 }
]);

// 3. Books per genre
db.books.aggregate([
  { $group: { _id: "$genre", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);

// 4. Authors with more than 2 books
db.books.aggregate([
  { $group: { _id: "$authorId", totalBooks: { $sum: 1 } } },
  { $match: { totalBooks: { $gt: 2 } } }
]);

// 5. Total reward points per author
db.books.aggregate([
  { $unwind: "$ratings" },
  { $group: { _id: "$authorId", totalPoints: { $sum: "$ratings.score" } } }
]);
