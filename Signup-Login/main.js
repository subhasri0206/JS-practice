// Initially hide the password field in the login form
document.getElementById('login-password').style.display = 'none';

document.getElementById('name-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    if (name.length >= 2 && name.length <= 30) {
        navigateToPage('age-username-page');
    } else {
        alert('Name must be between 2 and 30 characters.');
    }
});

document.getElementById('age-username-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const age = document.getElementById('age').value;
    const username = document.getElementById('username').value;

    if (age >= 0 && age <= 100 && username.length >= 6 && username.length <= 20) {
        navigateToPage('password-page');
    } else {
        alert('Age must be between 0 and 100 and username must be between 6 and 20 characters.');
    }
});

document.getElementById('password-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    const username = document.getElementById('username').value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$%^&*!?])[A-Za-z\d@$%^&*!?]{8,20}$/;

    if (passwordRegex.test(password) && password === confirmPassword) {
        localStorage.setItem('user', JSON.stringify({
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            username: username,
            password: password
        }));
        alert('Signup successful!');
        navigateToPage('login-page');
        document.getElementById('login-username').value = username; // Auto-fill username in login form
    } else {
        alert('Password must be between 8 and 20 characters, and must include an uppercase letter, a lowercase letter, a number, and a special character. Confirm password must match.');
    }
});

document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const loginUsername = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;

    const userData = JSON.parse(localStorage.getItem('user'));

    if (userData && userData.username === loginUsername) {
        // Show password field if username is found
        document.getElementById('login-password').style.display = 'block';
        document.getElementById('login-password').disabled = false; // Enable password field
        if (loginPassword === userData.password) {
            alert('Login successful!');
            // Optionally, redirect to another page or reset the form
            document.getElementById('login-form').reset(); // Clear login form
        } else {
            alert('Enter the password.');
        }
    } else {
        alert('Username not found.');
        // Hide password field if username is not found
        document.getElementById('login-password').style.display = 'none';
    }
});

// Function to navigate between pages
function navigateToPage(pageId) {
    const pages = ['signup-page', 'age-username-page', 'password-page', 'login-page'];
    pages.forEach(page => {
        document.getElementById(page).style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
}
