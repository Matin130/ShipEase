let clientInfo = {};

function signUp() {
    let email = document.getElementById('email').value;
    let companyName = document.getElementById('companyName').value;
    let password = document.getElementById('password').value;

    if (!requiredPassword(password)) {
        document.getElementById('message').textContent = 'Password must be at least 8 characters long, with a combination of alphabets and numbers.';
        return;
    }

    clientInfo[email] = {companyName:companyName, password: password};
    localStorage.setItem('clientInfo', JSON.stringify(clientInfo));
    document.getElementById('message').textContent = 'Sign Up successful';
    window.location.href = "booking.html";

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('userName').textContent = localStorage.getItem('loggedInUser');
      });
    
}
 
function requiredPassword(password) {
    if (password.length < 8) return false;
    else if (!/[a-zA-Z]/.test(password)) return false;
    else if (!/[0-9]/.test(password)) return false;
    return true;
}

function login() {
    let companyName = document.getElementById('companyName').value; 
    let password = document.getElementById('password').value; 
    let storedClientInfo = JSON.parse(localStorage.getItem('clientInfo'));

    
    if (!storedClientInfo) {
        document.getElementById('message').textContent = "No registered users found.";
        return;
    }

    let user = Object.values(storedClientInfo).find(user => user.companyName === companyName);

    if (user && user.password === password) {
        localStorage.setItem('loggedInUser', companyName);
        document.getElementById('message').textContent = 'Login successful';
        window.location.href = "booking.html";
    } else {
        document.getElementById('message').textContent = "Invalid company name or password";
    }
}

