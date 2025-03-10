export default async function (fastify, options) {
 
//////// Route to see Pokemon 
fastify.get('/Pokemon', async (request, reply) => {
  const db = fastify.sqlite.db;
  console.log("*********  =====  /Pokemon ===== ************");
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM Pokemon", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
    console.log("*********======END======************");
    return reply.send(rows);
  } catch (err) {
    return reply.code(500).send({ error: 'Database error', details: err.message });
  }
});


// Route to fetch Pokemon data
  fastify.get('/Pokemon/id/:name', async (request, reply) => {
    console.log("*********  ===== /Pokemon:name  ===== ************");
    const { name } = request.params;
    console.log("Pokemon name : ", name);
    try {
      const response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
  
      if (!response.ok) {
        return reply.code(404).send({ error: 'Pokemon not found' });
      }
      const data = await response.json();
      console.log(data);
      return reply.send(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      return reply.code(500).send({ error: 'Failed to fetch data from the API' });
    }
  });
}



/*
fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then(res => { 
    return res.json() 
  }).then(data => console.log(data));
  
  db.all("SELECT * FROM Pokemon WHERE pokedex_id = ?", [pokedexId], (err, rows) => {
    if (err) {
      console.error("Error fetching Pokemon:", err.message);
      return;
    }
    console.log("Pokemon entries:", rows);
  });
  */