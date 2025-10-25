// here we can create a external javascript file and link it to html file.
// declare a array of famous movies of all time
// in javascript, we use const keyword to declare a constant variable
const famousMovies = [
  "The Shawshank Redemption",
  "The Godfather",
  "The Dark Knight",
  "Pulp Fiction",
  "Schindler's List"
];

// function to display famous movies in the console
function displayFamousMovies() {
  console.log("Famous Movies of All Time:");
  famousMovies.forEach(movie => {
    console.log("- " + movie);
  });
}
// call the function to display movies
displayFamousMovies();

// we need to display famous movies in the console when this script is loaded
