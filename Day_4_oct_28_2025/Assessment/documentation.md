Documentation – Fetch API Assignment
Project Title:

Blog & Todo App using Fetch API

Objective:

To build a frontend web application that retrieves and displays blog posts and todo items from public APIs using Fetch API, with proper error handling and structured using a JavaScript Design Pattern.

APIs Used

Posts API: https://jsonplaceholder.typicode.com/posts

Todos API: https://jsonplaceholder.typicode.com/todos

Features

Fetch and display a list of blog posts dynamically.

Fetch and display a todo list with completed tasks shown in strikethrough.

Handle network or server errors gracefully.

Structured using the Revealing Module Pattern for maintainability.

Technologies Used

HTML5 – for structure

CSS3 – for layout and styling

JavaScript (ES6+) – for Fetch API, DOM manipulation, and design pattern implementation

Code Structure
|-- index.html       → Main structure of the web page
|-- script.js        → Contains Fetch API calls and logic (Module Pattern)
|-- style (inline)   → Basic layout and formatting

Workflow

Fetch Data:
The app uses the Fetch API to make GET requests to /posts and /todos endpoints.

Process Data:
The JSON response is parsed and a subset of records is selected (first 5 posts, first 10 todos).

Display Data:
Dynamically created HTML elements display the content on the web page.

Error Handling:
If the request fails or the response is invalid, a red error message is shown to the user.

Design Pattern:
The logic is wrapped inside a Revealing Module Pattern, exposing only an init() method to start the app.

Design Pattern Used
Revealing Module Pattern

Used to keep the code modular and avoid polluting the global scope.
Example:

const AppModule = (function () {
   // private functions and variables
   async function fetchData(url) {...}
   function displayPosts(data) {...}
   
   // public methods
   return { init };
})();


This improves readability, scalability, and prevents variable conflicts.

Error Handling Example

If the API is unreachable or response is invalid:

if (!response.ok) throw new Error(`Server Error: ${response.status}`);


An error message like
"Failed to fetch data: Server Error 404"
is displayed on the webpage.

Learning Reflection

This project helped me understand how to:

Use the Fetch API to get and display remote JSON data.

Handle errors effectively in JavaScript.

Implement DOM manipulation for dynamic content.

Apply the Module Pattern for cleaner, more maintainable code.