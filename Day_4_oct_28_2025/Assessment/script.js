const AppModule = (function () {
  const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

  // DOM Elements
  const postsContainer = document.getElementById("posts");
  const todosContainer = document.getElementById("todos");
  const errorMessage = document.getElementById("errorMessage");

  // Fetch Data (Reusable)
  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Server Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      showError(`Failed to fetch data: ${error.message}`);
      return null;
    }
  }

  // Display Posts
  function displayPosts(posts) {
    if (!posts) return;
    postsContainer.innerHTML = posts.slice(0, 5)
      .map(post => `
        <div style="border-bottom:1px solid #ddd; margin-bottom:10px;">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `)
      .join("");
  }

  // Display Todos
  function displayTodos(todos) {
    if (!todos) return;
    todosContainer.innerHTML = todos.slice(0, 10)
      .map(todo => `
        <li class="${todo.completed ? 'completed' : ''}">
          ${todo.title}
        </li>
      `)
      .join("");
  }

  // Error Handler
  function showError(message) {
    errorMessage.textContent = message;
  }

  // Initialize Application
  async function init() {
    const posts = await fetchData(POSTS_URL);
    displayPosts(posts);

    const todos = await fetchData(TODOS_URL);
    displayTodos(todos);
  }

  // Public API (Revealing Module Pattern)
  return {
    init,
  };
})();

// Initialize on Page Load
document.addEventListener("DOMContentLoaded", AppModule.init);
