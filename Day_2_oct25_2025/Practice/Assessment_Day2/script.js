// ========== USER HANDLING ==========
const USER_KEY = "sf_users_v1";
let users = JSON.parse(localStorage.getItem(USER_KEY)) || [];

// Default test user
if (!users.length) {
  users.push({ username: "student1", password: "pass123", klass: "12 - Science" });
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

let currentUser = null;

// ========== AUTH FUNCTIONS ==========
function showRegister() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "flex";
}

function showLogin() {
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("loginForm").style.display = "flex";
}

function registerUser() {
  const username = document.getElementById("regUser").value.trim();
  const password = document.getElementById("regPass").value.trim();
  const klass = document.getElementById("regClass").value.trim();

  if (!username || !password) {
    alert("Please enter username and password");
    return;
  }

  if (users.find(u => u.username === username)) {
    alert("Username already exists!");
    return;
  }

  users.push({ username, password, klass });
  localStorage.setItem(USER_KEY, JSON.stringify(users));
  alert("Registration successful! You can now log in.");
  showLogin();
}

function loginUser() {
  const username = document.getElementById("loginUser").value.trim();
  const password = document.getElementById("loginPass").value.trim();

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    alert("Invalid username or password!");
    return;
  }

  currentUser = user;
  document.getElementById("authSection").style.display = "none";
  document.getElementById("welcomeSection").style.display = "block";
  document.getElementById("statusHint").textContent = `Signed in as: ${user.username}`;
  document.getElementById("welcomeText").textContent = `Welcome, ${user.username} (${user.klass || "N/A"})`;
}

function logout() {
  currentUser = null;
  document.getElementById("authSection").style.display = "block";
  document.getElementById("welcomeSection").style.display = "none";
  document.getElementById("monthlySection").style.display = "none";
  document.getElementById("statusHint").textContent = "Not signed in";
}

// ========== MONTHLY ACTIVITIES ==========
const activities = [
  { id: 1, activity: "Create project file containing tables between 12 to 19", subject: "Maths" },
  { id: 2, activity: "Physics lab: measure acceleration", subject: "Physics" },
  { id: 3, activity: "Chemistry: write reaction equations", subject: "Chemistry" },
  { id: 4, activity: "Computer: build HTML login form", subject: "Computer" },
  { id: 5, activity: "Biology: draw plant cell diagram", subject: "Biology" }
];

function openMonthlyActivities() {
  document.getElementById("welcomeSection").style.display = "none";
  document.getElementById("monthlySection").style.display = "block";
  populateSubjects();
  renderActivities();
}

function goToWelcome() {
  document.getElementById("monthlySection").style.display = "none";
  document.getElementById("welcomeSection").style.display = "block";
}

function populateSubjects() {
  const subjects = [...new Set(activities.map(a => a.subject))];
  const select = document.getElementById("subjectSelect");
  select.innerHTML = '<option value="">-- All Subjects --</option>';
  subjects.forEach(s => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    select.appendChild(opt);
  });
}

function renderActivities() {
  const subj = document.getElementById("subjectSelect").value;
  const container = document.getElementById("activitiesContainer");
  const filtered = subj ? activities.filter(a => a.subject === subj) : activities;

  if (!filtered.length) {
    container.innerHTML = "<p>No activities found.</p>";
    return;
  }

  let html = `<table class="table"><thead><tr><th>ID</th><th>Activity</th><th>Subject</th></tr></thead><tbody>`;
  filtered.forEach(a => {
    html += `<tr><td>${a.id}</td><td>${a.activity}</td><td>${a.subject}</td></tr>`;
  });
  html += "</tbody></table>";
  container.innerHTML = html;
}
