const API_URL = 'http://localhost:3000/api/users';
let token = '';

async function login() {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'password' })
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.statusText}`);
        }

        const data = await response.json();
        token = data.token;
        console.log(" New token received : ", token) ;
        document.getElementById('output').innerText = `Login Successful!\nToken:\n${token}`;
    } catch (error) {
        document.getElementById('output').innerText = `Error: ${error.message}`;
    }
}

async function getProfile() {
    try {
        if (!token) {
            throw new Error("You must log in first!");
        }

        console.log("Sending the token : ", token);
        const response = await fetch(`${API_URL}/profile`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
            throw new Error(`Request failed: ${response.statusText}`);
        }

        const data = await response.json();
        document.getElementById('output').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById('output').innerText = `Error: ${error.message}`;
    }
}

