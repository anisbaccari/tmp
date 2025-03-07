//import 'dotenv/config';
const API_URL = 'http://localhost:3000';
let token = '';

 async function login() {

   // console.log(process.env.URL);
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


//// REQUEST TO DATABASE
async function getuser() 
{
    const content =document.getElementById('content');

    try 
    {
        const response = await fetch(`${API_URL}/user` );

        if(!response.ok)
            throw new Error(`failed to get user: ${response.statusText}`);
        const data = await response.json();
        console.log("=============================="); 
        console.log("user" , data[0].id); 
        console.log("=============================="); 
        const  user = data;
        content.appendChild(user);

    }
    catch(error)
    {
        document.getElementById('output').innerText = `Error: ${error.message}`;

    }
}

