// ======== LOGIN & REGISTER SYSTEM ========

// DOM elements
const loginSection = document.getElementById("loginSection");
const registerSection = document.getElementById("registerSection");
const appSection = document.getElementById("appSection");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");
const logoutBtn = document.getElementById("logoutBtn");
const welcomeMessage = document.getElementById("welcomeMessage");

// Switch between Login and Register
showRegister.addEventListener("click", () => {
  loginSection.classList.add("hidden");
  registerSection.classList.remove("hidden");
});

showLogin.addEventListener("click", () => {
  registerSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

// Register user
registerBtn.addEventListener("click", () => {
  const username = document.getElementById("regUsername").value.trim();
  const password = document.getElementById("regPassword").value.trim();
  const email = document.getElementById("regEmail").value.trim();

  if (!username || !password || !email) {
    alert("Please fill all fields!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const exists = users.some((u) => u.username === username);

  if (exists) {
    alert("Username already exists!");
    return;
  }

  users.push({ username, password, email });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful! Please login now.");
  registerSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

// Login user
loginBtn.addEventListener("click", () => {
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!validUser) {
    alert("Invalid credentials!");
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(validUser));
  showApp(validUser.username);
});

// Show main app
function showApp(username) {
  loginSection.classList.add("hidden");
  registerSection.classList.add("hidden");
  appSection.classList.remove("hidden");
  welcomeMessage.textContent = `Welcome, ${username}!`;
}

// Auto login
window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) showApp(user.username);
});

// Logout
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  appSection.classList.add("hidden");
  loginSection.classList.remove("hidden");
});

// ======== ES6 ASSIGNMENT DEMO ========

const runDemoBtn = document.getElementById("runDemoBtn");
const outputDiv = document.getElementById("output");

runDemoBtn.addEventListener("click", () => {
  outputDiv.innerHTML = "";

  // let & const
  const instituteName = "Spring Flowers Institute";
  let courseName = "B.Tech in Computer Science";

  // Spread Operator
  const coreSubjects = ["Math", "English", "Database"];
  const advancedSubjects = ["AI", "Data Science", "Cloud"];
  const allSubjects = [...coreSubjects, ...advancedSubjects];

  // Arrow Function
  const greet = (name) => `Hello ${name}, welcome to ${instituteName}!`;

  // Class
  class Student {
    constructor(name, age, skills) {
      this.name = name;
      this.age = age;
      this.skills = skills;
    }
    display() {
      return `<b>${this.name}</b> (Age: ${this.age}) - Skills: ${this.skills.join(", ")}`;
    }
  }

  const s1 = new Student("Alice", 21, ["Python", "HTML", "CSS"]);
  const s2 = new Student("Bob", 22, ["JavaScript", "React", "Node"]);

  // Map for Grades
  const studentGrades = new Map();
  studentGrades.set("Alice", "A");
  studentGrades.set("Bob", "B+");

  // Set for Unique Skills
  const uniqueSkills = new Set([...s1.skills, ...s2.skills]);

  // Display Results
  outputDiv.innerHTML += `<h3>Institute: ${instituteName}</h3>`;
  outputDiv.innerHTML += `<p>Course: ${courseName}</p>`;
  outputDiv.innerHTML += `<p><b>Subjects:</b> ${allSubjects.join(", ")}</p>`;
  outputDiv.innerHTML += `<p>${greet("Student")}</p>`;
  outputDiv.innerHTML += `<h3>Students</h3><p>${s1.display()}</p><p>${s2.display()}</p>`;
  outputDiv.innerHTML += `<h3>Grades</h3>`;
  studentGrades.forEach((grade, name) => {
    outputDiv.innerHTML += `<p>${name}: ${grade}</p>`;
  });
  outputDiv.innerHTML += `<h3>Unique Skills</h3><p>${[...uniqueSkills].join(", ")}</p>`;
});

// ======== DYNAMIC STUDENT ADDITION ========

const addStudentBtn = document.getElementById("addStudentBtn");

addStudentBtn.addEventListener("click", () => {
  const name = document.getElementById("studentName").value.trim();
  const age = document.getElementById("studentAge").value.trim();
  const skills = document
    .getElementById("studentSkills")
    .value.split(",")
    .map((s) => s.trim())
    .filter((s) => s);
  const grade = document.getElementById("studentGrade").value.trim();

  if (!name || !age || skills.length === 0 || !grade) {
    alert("Please fill all fields!");
    return;
  }

  let students = JSON.parse(localStorage.getItem("students")) || [];
  students.push({ name, age, skills, grade });
  localStorage.setItem("students", JSON.stringify(students));

  renderStudents();
});

function renderStudents() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  if (students.length === 0) return;

  outputDiv.innerHTML = `<h3>All Students</h3>`;
  students.forEach((s) => {
    outputDiv.innerHTML += `<p><b>${s.name}</b> (Age: ${s.age}) - Skills: ${s.skills.join(
      ", "
    )} - Grade: ${s.grade}</p>`;
  });
}
