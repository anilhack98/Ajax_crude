<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AJAX CRUD Application</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="container">
        <h1>AJAX CRUD Application</h1>

        <div id="alertBox" class="hidden"></div>

        <!-- Form -->
        <form id="userForm">
            <input type="hidden" id="userId">
            <input type="text" id="name" placeholder="Name" required>
            <input type="email" id="email" placeholder="Email" required>
            <button type="submit" id="saveBtn">Save</button>
            <button type="reset">Clear</button>
        </form>

        <!-- User Table -->
        <input type="text" id="search" placeholder="Search by name or email" style="display: none" />
        <div id="userTable"></div>
    </div>

    <script src="script.js"></script>
</body>

</html>