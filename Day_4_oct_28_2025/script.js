const API_URL = "https://jsonplaceholder.typicode.com/users";
const userTable = document.getElementById("userTable");
const addBtn = document.getElementById("addUser");
const updateBtn = document.getElementById("updateUser");

let editUserId = null;

// ✅ GET USERS
async function getUsers() {
  const res = await fetch(API_URL);
  const users = await res.json();
  renderTable(users);
}

function renderTable(users) {
  userTable.innerHTML = "";
  users.forEach(user => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.username}</td>
      <td>
        <button class="action-btn edit" onclick="editUser(${user.id}, '${user.name}', '${user.email}', '${user.username}')">Edit</button>
        <button class="action-btn delete" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    userTable.appendChild(row);
  });
}

// ✅ ADD USER (POST)
addBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;

  if (!name || !email || !username) return alert("Fill all fields!");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, username }),
  });

  const newUser = await res.json();
  alert(`✅ User added with ID: ${newUser.id}`);
  getUsers();
  clearForm();
});

// ✅ EDIT (LOAD DATA)
function editUser(id, name, email, username) {
  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("username").value = username;
  editUserId = id;
  addBtn.disabled = true;
  updateBtn.disabled = false;
}

// ✅ UPDATE USER (PUT)
updateBtn.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;

  if (!name || !email || !username) return alert("Fill all fields!");

  const res = await fetch(`${API_URL}/${editUserId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: editUserId, name, email, username }),
  });

  const updatedUser = await res.json();
  alert(`✅ User ${updatedUser.id} updated successfully!`);
  getUsers();
  clearForm();
  addBtn.disabled = false;
  updateBtn.disabled = true;
});

// ✅ DELETE USER
async function deleteUser(id) {
  if (!confirm("Are you sure you want to delete this user?")) return;

  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  alert(`🗑️ User ${id} deleted successfully!`);
  getUsers();
}

// 🧹 Clear form
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("username").value = "";
  editUserId = null;
}

// Load initial users
getUsers();
