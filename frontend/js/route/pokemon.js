export const API_URL = 'http://localhost:3000';

//// REQUEST TO DATABASE
async function getPokemon() 
{
    const content =document.getElementById('content');

    try 
    {
        const response = await fetch(`${API_URL}/Pokemon` );

        if(!response.ok)
            throw new Error(`failed to get Pokemon: ${response.statusText}`);
        const data = await response.json();
        console.log("=============================="); 
        console.log("Pokemon" , data[0].id); 
        console.log("=============================="); 
        const  pokemon = document.createElement('img'); 
        pokemon.src = data[0].img; 
        pokemon.alt = data[0].name; 
        pokemon.className = 'pokemon-img';
        content.appendChild(pokemon);

    }
    catch(error)
    {
        document.getElementById('output').innerText = `Error: ${error.message}`;

    }
}
//// REQUEST TO API
async function getPokemonByName(pokemonName) 
{
    const content =document.getElementById('content');

    try 
    {
        const response = await fetch(`${API_URL}/Pokemon/${pokemonName}` );

        if(!response.ok)
            throw new Error(`failed to get Pokemon: ${response.statusText}`);
        const data = await response.json();
        console.log("=============================="); 
        console.log("Pokemon" , data); 
        console.log("=============================="); 
        const  pokemon = document.createElement('img'); 
        pokemon.src = data.sprites.front_default; 
        pokemon.alt = data.name; 
        pokemon.className = 'pokemon-img';
        content.appendChild(pokemon);

    }
    catch(error)
    {
        document.getElementById('output').innerText = `Error: ${error.message}`;

    }
}

/// FUNCTION FROM THE FORM:LABEL
function searchPokemon(event) {
    event.preventDefault();
    const name = document.getElementById('pokemonName').value;
    getPokemonByName(name);
}