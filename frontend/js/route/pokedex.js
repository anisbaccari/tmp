


//// REQUEST TO DATABASE
async function getPokedex() 
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
//// REQUEST TO API
async function getpokedexByName(pokedexName) 
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