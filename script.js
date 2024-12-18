document.addEventListener("DOMContentLoaded", function () {
    loadUsers();

    // Handle form submission
    document.getElementById("userForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const userId = document.getElementById("userId").value;
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        const formData = new FormData();
        formData.append("userId", userId);
        formData.append("name", name);
        formData.append("email", email);

        const action = userId ? "update" : "create";
        // const action = "create";
        fetch(`crud.php?action=${action}`, { method: "POST", body: formData })
            .then((response) => response.json())
            .then((data) => {
                showAlert(data.message, "success");
                document.getElementById("userForm").reset();
                loadUsers();
            });
    });
});

document.getElementById("search").addEventListener("input", function () {
    const query = this.value.toLowerCase();

    fetch(`crud.php?action=search&query=${query}`, { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            const userTable = document.getElementById("userTable");
            if (!data.length) {
                userTable.innerHTML = "";
                return;
            }
            userTable.innerHTML = `
                <div class="table-container">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="userTableBody"></tbody>
                </table>
                </div>`;

            const userTableBody = document.getElementById("userTableBody");
            userTableBody.innerHTML = data
                .map(
                    (user) => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>
                            <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                            <button onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>`
                )
                .join("");
        });
});

// Load users
function loadUsers() {
    fetch("crud.php?action=read", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
            const userTable = document.getElementById("userTable");
            if (!data.length) {
                // Clear table
                userTable.innerHTML = "";

                // Hide search box
                document.getElementById("search").style.display = "none";

                return;
            }
            userTable.innerHTML = `
            <div class="table-container">
                <table class="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="userTableBody"></tbody>
                </table>
            </div>`;
            const userTableBody = document.getElementById("userTableBody");
            userTableBody.innerHTML = data
                .map(
                    (user) => `
                    <tr>
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>
                            <button onclick="editUser(${user.id}, '${user.name}', '${user.email}')">Edit</button>
                            <button onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>`
                )
                .join("");
            document.getElementById("search").style.display = "block";
        });
}

// Edit user
function editUser(id, name, email) {
    document.getElementById("userId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
}

// Delete user
function deleteUser(id) {
    if (confirm("Are you sure you want to delete this user?")) {
        fetch(`crud.php?action=delete&id=${id}`, { method: "DELETE" })
            .then((response) => response.json())
            .then((data) => {
                showAlert(data.message, "success");
                loadUsers();
            });
    }
}

// Function to display an alert
function showAlert(message, type = "success") {
    const alertBox = document.getElementById("alertBox");
    alertBox.textContent = message;
    alertBox.className = type; // Add success or error class
    alertBox.style.display = "block"; // Show alert
    alertBox.style.opacity = "1";
    alertBox.style.top = "20px";

    // Hide the alert after 3 seconds
    setTimeout(() => {
        alertBox.style.opacity = "0";
        alertBox.style.top = "10px";
        setTimeout(() => {
            alertBox.style.display = "none";
        }, 300); // Wait for the fade-out transition to complete
    }, 3000);
}
