
//// REQUEST TO DATABASE
export async function getPokedex() 
{
    const content =document.getElementById('content');

    try 
    {
        const response = await fetch(`http://localhost:3000/Pokedex` );

        if(!response.ok)
            throw new Error(`failed to get Pokedex: ${response.statusText}`);
        const data = await response.json();
        console.log("=============================="); 
        console.log("Pokedex" , data[0].id); 
        console.log("==============================");
        const  pokedex = document.createElement('img'); 
        content.appendChild(pokedex);

    }
    catch(error)
    {
        document.getElementById('output').innerText = `Error: ${error.message}`;

    }
}

function displayPokedex(name,img)
{
    const content =document.getElementById('result');
    const myimg=document.createElement('img'); 
    myimg.src =img; 
    myimg.alt = name;

    content.appendChild(myimg);

}

export async function fetchPokedex(userid)
{
    console.log(" >> [Pokedex]: userid " + userid); 
    try
    {
        const response = await fetch(`http://localhost:3000/Pokedex` ,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({value : userid })
        });

        if(!response.ok)
            throw new Error(" >> [Pokedex]: failed to get repsonse");
        const data = await response.json();
        console.log("RESPONSE:", JSON.stringify(data, null, 2)); // Log the response data
        console.log(data.pokedex[0].name);
        const name = data.pokedex[0].name; 
        const img =  data.pokedex[0].img;
        displayPokedex(name,img);

    }
    catch(err)
    {
        console.log(" >> [Pokedex]: " + err.message); 
    }

}


//// REQUEST TO API
export async function getpokedexByName(pokedexName) 
{
    const content =document.getElementById('content');

    try 
    {
        const response = await fetch(`http://localhost:3000/pokedex/${pokedexName}` );

        if(!response.ok)
            throw new Error(`failed to get pokedex: ${response.statusText}`);
        const data = await response.json();
        console.log("=============================="); 
        console.log("pokedex" , data); 
        console.log("=============================="); 
        const  pokedex = document.createElement('img'); 
        content.appendChild(pokedex);

    }
    catch(error)
    {
        document.getElementById('output').innerText = `Error: ${error.message}`;

    }
}