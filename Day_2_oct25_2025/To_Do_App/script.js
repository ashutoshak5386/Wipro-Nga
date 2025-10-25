// JavaScript code for To-Do Application using DOM manipulation

// Select the necessary DOM elements
const todoInput = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskButton');
const todoList = document.getElementById('taskList');

// Function to add a new task
function addTask() {
  const taskText = todoInput.value.trim();

  if (taskText !== "") {
    const li = document.createElement("li");
    li.textContent = taskText;
    todoList.appendChild(li);
    todoInput.value = "";
  }
}

// Function to delete completed tasks (if you plan to mark them later)
function deleteCompletedTasks() {
  const completedTasks = todoList.querySelectorAll("li.completed");
  completedTasks.forEach(task => task.remove());
}

// Event listener to add a new task
addButton.addEventListener("click", addTask);

// Event listener to remove a task when clicked
todoList.addEventListener("click", event => {
  if (event.target.tagName === "LI") {
    event.target.remove();
  }
});
