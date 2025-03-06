import { authenticate } from '../plugins/auth.js';

export default async function (fastify, options) {
  fastify.post('/login', async (request, reply) => {
    const { username, password } = request.body;

    console.log("==============================================="); 
    console.log(" username : " + username); 

    console.log("==============================================="); 
    
    if (username === 'admin' && password === 'password') {
      const token = fastify.jwt.sign({ username });
      return { token };
    }
    reply.code(401).send({ error: 'Unauthorized' });
  });

  fastify.get('/profile', { preHandler: authenticate }, async (request, reply) => {
    return { message: 'This is a protected route', user: request.user };
  });



//////// Route to see USER 
  fastify.get('/Users', async (request, reply) => {
    const db = fastify.sqlite.db;

    try {
      const rows = await new Promise((resolve, reject) => {
        db.all("SELECT * FROM Users", [], (err, rows) => {
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
}
/*
fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then(res => { 
    return res.json() 
  }).then(data => console.log(data));
  */