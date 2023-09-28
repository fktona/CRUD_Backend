document.addEventListener('DOMContentLoaded', () => {
    const addUserForm = document.getElementById('addUserForm');
    const nameInput = document.getElementById('name');
    const ageInput = document.getElementById('age');
    const emailInput = document.getElementById('email');
    const userList = document.getElementById('userList');
    const searchInput = document.getElementById('search');
    const listAllUsersButton = document.getElementById('listAllUsersButton');

    // Function to fetch and display users
    async function fetchUsers() {
        try {
            const response = await fetch('https://crud-server-d24p.onrender.com/api');
            const data = await response.json();

            userList.innerHTML = '';

            if (data.length === 0) {
                userList.innerHTML = '<li>No users found.</li>';
            } else {
                data.forEach((user) => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>Name:</strong> ${user.name} 
                        <strong>Age:</strong> ${user.age} 
                        <strong>Email:</strong> ${user.email} 
                        <button class="update" data-id="${user.id}">Update</button> 
                        <button class="delete" data-id="${user.id}">Delete</button>
                    `;
                    userList.appendChild(listItem);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    
    

    // Function to add a new user
    addUserForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = nameInput.value;
        const age = ageInput.value;
        const email = emailInput.value;

        try {
            const response = await fetch('https://crud-server-d24p.onrender.com/api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, age, email }),
            });

            if (response.status === 200) {
                nameInput.value = '';
                ageInput.value = '';
                emailInput.value = '';
                fetchUsers();
            }
        } catch (error) {
            console.error(error);
        }
    });

    // Function to update user
    async function updateUser(userId) {
        // Implement the logic to update a user
    }

    // Function to delete user
    async function deleteUser(userId) {
        // Implement the logic to delete a user
    }

    // Add click event listeners for update and delete buttons in the user list
    userList.addEventListener('click', (e) => {
        if (e.target.classList.contains('update')) {
            const userId = e.target.getAttribute('data-id');
            updateUser(userId);
        } else if (e.target.classList.contains('delete')) {
            const userId = e.target.getAttribute('data-id');
            deleteUser(userId);
        }
    });

    // Function to list all users
    async function listAllUsers() {
        try {
            const response = await fetch('https://crud-server-d24p.onrender.com/api/allusers');
            const data = await response.json();

            userList.innerHTML = '';

            if (data.length === 0) {
                userList.innerHTML = '<li>No users found.</li>';
            } else {
                data.forEach((user) => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `
                        <strong>Name:</strong> ${user.name} 
                        <strong>Age:</strong> ${user.age} 
                        <strong>Email:</strong> ${user.email}
                    `;
                    userList.appendChild(listItem);
                });
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Add a click event listener to the "List All Users" button
    listAllUsersButton.addEventListener('click', listAllUsers);

    // Function to search users by name
    searchInput.addEventListener('input', async () => {
        const searchName = searchInput.value;
        const response = await fetch(`https://crud-server-d24p.onrender.com/api/byname/${searchName}`);
        const data = await response.json();

        userList.innerHTML = '';

        if (data.length === 0) {
            userList.innerHTML = '<li>No users found.</li>';
        } else {
            data.forEach((user) => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `
                    <strong>Name:</strong> ${user.name} 
                    <strong>Age:</strong> ${user.age} 
                    <strong>Email:</strong> ${user.email}
                `;
                userList.appendChild(listItem);
            });
        }
    });

    // Initial fetch of users
    fetchUsers();
});
