export default async function (fastify, options) {
 
 //////// Route to see Pokedex 
fastify.get('/Pokedex', async (request, reply) => {
  const db = fastify.sqlite.db;
  console.log("********* ===== /Pokedex  ==== ************");
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all("SELECT * FROM Pokedex", [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
    console.log("*********====END======************");
    return reply.send(rows);
  } catch (err) {
    return reply.code(500).send({ error: 'Database error', details: err.message });
  }
});
}




/*
fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then(res => { 
    return res.json() 
  }).then(data => console.log(data));
  */