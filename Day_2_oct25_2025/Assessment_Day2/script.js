let students = [
  { username: "student1", password: "pass123", class: "12 - Science" },
  { username: "admin", password: "admin123", class: "Teacher" }
];

const monthlyActivities = [
  { id: 1, activity: "Create project file which contains tables between 12 to 19", subject: "Maths" },
  { id: 2, activity: "Physics lab: Measure acceleration due to gravity", subject: "Physics" },
  { id: 3, activity: "Chemistry: Write balanced chemical equations for 10 reactions", subject: "Chemistry" },
  { id: 4, activity: "Computer: Build HTML login form with validation", subject: "Computer" },
  { id: 5, activity: "Biology: Draw and label plant cell diagram", subject: "Biology" },
  { id: 6, activity: "Maths: Solve integration problems from chapter 7", subject: "Maths" },
  { id: 7, activity: "Physics: Study motion in straight line - numericals", subject: "Physics" },
  { id: 8, activity: "English: Write essay on environmental conservation", subject: "English" },
  { id: 9, activity: "Chemistry: Prepare organic compounds notes", subject: "Chemistry" },
  { id: 10, activity: "Biology: Study human digestive system", subject: "Biology" }
];

const timetable = [
  { day: "Monday", period1: "Maths", period2: "Physics", period3: "Chemistry", period4: "English", period5: "Computer", period6: "Biology" },
  { day: "Tuesday", period1: "Physics", period2: "Maths", period3: "English", period4: "Chemistry", period5: "Biology", period6: "Computer" },
  { day: "Wednesday", period1: "Chemistry", period2: "English", period3: "Maths", period4: "Physics", period5: "Computer", period6: "Biology" },
  { day: "Thursday", period1: "English", period2: "Biology", period3: "Physics", period4: "Maths", period5: "Chemistry", period6: "Computer" },
  { day: "Friday", period1: "Computer", period2: "Chemistry", period3: "Biology", period4: "English", period5: "Maths", period6: "Physics" },
  { day: "Saturday", period1: "Biology", period2: "Computer", period3: "English", period4: "Chemistry", period5: "Physics", period6: "Maths" }
];

let currentStudent = null;

// ========== PAGE NAVIGATION ==========
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function showLoginForm() {
  document.getElementById('loginFormSection').style.display = 'block';
  document.getElementById('registerFormSection').style.display = 'none';
}

function showRegisterForm() {
  document.getElementById('loginFormSection').style.display = 'none';
  document.getElementById('registerFormSection').style.display = 'block';
}

// ========== AUTHENTICATION ==========
function handleLogin(event) {
  event.preventDefault();
  const username = document.getElementById('loginUsername').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  const student = students.find(s => s.username === username && s.password === password);

  if (student) {
    currentStudent = student;
    document.getElementById('studentName').textContent = `Hello, ${student.username}!`;
    document.getElementById('studentClass').textContent = `Class: ${student.class || 'Not Specified'}`;
    document.getElementById('loginForm').reset();
    showPage('welcomePage');
  } else {
    alert('Invalid username or password. Please try again.');
  }
}

function handleRegister(event) {
  event.preventDefault();
  const username = document.getElementById('registerUsername').value.trim();
  const password = document.getElementById('registerPassword').value.trim();
  const studentClass = document.getElementById('registerClass').value.trim();

  if (!username || !password) {
    alert('Username and password are required!');
    return;
  }

  if (students.find(s => s.username === username)) {
    alert('Username already exists! Please choose a different one.');
    return;
  }

  students.push({ username, password, class: studentClass });
  alert('Registration successful! You can now login.');
  document.getElementById('registerForm').reset();
  showLoginForm();
}

function handleLogout() {
  currentStudent = null;
  document.getElementById('loginForm').reset();
  showPage('loginPage');
  showLoginForm();
}

// ========== ACTIVITIES ==========
function populateSubjectFilter() {
  const subjects = [...new Set(monthlyActivities.map(a => a.subject))].sort();
  const select = document.getElementById('subjectFilter');
  select.innerHTML = '<option value="">All Subjects</option>';
  subjects.forEach(subject => {
    const opt = document.createElement('option');
    opt.value = subject;
    opt.textContent = subject;
    select.appendChild(opt);
  });
}

function renderActivitiesTable() {
  const filterValue = document.getElementById('subjectFilter').value;
  const container = document.getElementById('activitiesTableContainer');

  const filtered = filterValue
    ? monthlyActivities.filter(a => a.subject === filterValue)
    : monthlyActivities;

  if (filtered.length === 0) {
    container.innerHTML = '<div class="no-data">No activities found for the selected subject.</div>';
    return;
  }

  container.innerHTML = `
    <table>
      <thead><tr><th>ID</th><th>Activity</th><th>Subject</th></tr></thead>
      <tbody>
        ${filtered.map(a => `<tr><td>${a.id}</td><td>${a.activity}</td><td>${a.subject}</td></tr>`).join('')}
      </tbody>
    </table>
  `;
}

function showMonthlyActivities() {
  populateSubjectFilter();
  renderActivitiesTable();
  showPage('activitiesPage');
}

// ========== TIMETABLE ==========
function renderTimetable() {
  const container = document.getElementById('timetableContainer');
  container.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Day</th>
          <th>Period 1<br><small>9:00-10:00</small></th>
          <th>Period 2<br><small>10:00-11:00</small></th>
          <th>Period 3<br><small>11:00-12:00</small></th>
          <th>Period 4<br><small>12:00-1:00</small></th>
          <th>Period 5<br><small>2:00-3:00</small></th>
          <th>Period 6<br><small>3:00-4:00</small></th>
        </tr>
      </thead>
      <tbody>
        ${timetable.map(d => `
          <tr>
            <td><strong>${d.day}</strong></td>
            <td>${d.period1}</td><td>${d.period2}</td><td>${d.period3}</td>
            <td>${d.period4}</td><td>${d.period5}</td><td>${d.period6}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function showTimetable() {
  renderTimetable();
  showPage('timetablePage');
}

// ========== EVENT LISTENERS ==========
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('showRegisterBtn').addEventListener('click', showRegisterForm);
  document.getElementById('showLoginBtn').addEventListener('click', showLoginForm);
  document.getElementById('loginForm').addEventListener('submit', handleLogin);
  document.getElementById('registerForm').addEventListener('submit', handleRegister);
  document.getElementById('monthlyChartBtn').addEventListener('click', showMonthlyActivities);
  document.getElementById('timetableBtn').addEventListener('click', showTimetable);
  document.getElementById('logoutBtn').addEventListener('click', handleLogout);
  document.getElementById('subjectFilter').addEventListener('change', renderActivitiesTable);
  document.getElementById('backToWelcomeBtn1').addEventListener('click', () => showPage('welcomePage'));
  document.getElementById('backToWelcomeBtn2').addEventListener('click', () => showPage('welcomePage'));
});
