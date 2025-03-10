//import 'dotenv/config';
const API_URL = 'http://localhost:3000';
let token = '';

 async function login() {

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'anis', password: 'password' })
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

async function sendValue(name) {
    console.log("*************SEND VALUE() : ",name );
    try {
      const response = await fetch('http://localhost:3000/get-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ value: name })
      });
      const data = await response.json();
     if(response.ok)
     {
         ///// LOCAL STORAGE ////
        localStorage.setItem('userID', data.id);

        //// DISPLAY USER 
        const userid = data.id;
        const new_name = data.name;
        const pokedex_id = data.pokedex_id; 
        document.getElementById('output').innerText = `User !\n name: ${new_name}\n pokeid:${pokedex_id}`;
        console.log('Response from server:', data);

     } else {
         document.getElementById('output').innerText = " USER NOT FOUND";
     }

    } catch (error) {
      console.error('Error sending value:', error);
      document.getElementById('output').innerText = `User not fund ! `;
    }
     
  }


function selectUser(event)
{
    event.preventDefault(); 
    const name = document.getElementById('userInput').value;
    sendValue(name);
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

