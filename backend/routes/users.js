import { authenticate } from '../plugins/auth.js';

export default async function (fastify, options) {
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;

    if (username === 'admin' && password === 'password') {
      const token = fastify.jwt.sign({ username });
      return { token };
    }
    reply.code(401).send({ error: 'Unauthorized' });
  });

  fastify.get('/profile', { preHandler: authenticate }, async (request, reply) => {
    return { message: 'This is a protected route', user: request.user };
  });

  // Route to see tables
  fastify.get('/Student', async (request, reply) => {
    const db = fastify.sqlite.db;
    console.log("*********HERE************");
    try {
      const rows = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM Student", [], (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        });
      });
      console.log("*********OK************");
      return reply.send(rows);
    } catch (err) {
      return reply.code(500).send({ error: 'Database error', details: err.message });
    }
  });

  // Route to fetch Pokemon data
  fastify.get('/pokemon/:name', async (request, reply) => {
    console.log("*********OK************");
    const { name } = request.params;
    try {
      // Make sure the full URL is used for the external API request
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  
      console.log("*********HERE************");
      if (!response.ok) {
        return reply.code(404).send({ error: 'Pokemon not found' });
      }
      const data = await response.json();
      //console.log(data);
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
  */