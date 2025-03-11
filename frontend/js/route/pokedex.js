
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


export async function displayPokedex(userid)
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
        console.log(" RESPONSE : " + response);

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