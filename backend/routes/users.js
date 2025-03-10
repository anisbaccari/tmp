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
    } else if (username === 'anis' && password === 'password') {
      const token = fastify.jwt.sign({ username });
      return { token };
    }
    reply.code(401).send({ error: 'Unauthorized' });
  });

  fastify.get('/profile', { preHandler: authenticate }, async (request, reply) => {
    return { message: 'This is a protected route', user: request.user };
  });

  // Route to see USER 
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

  fastify.post('/get-user', async (request, reply) => {
    const db = fastify.sqlite.db;
  
    // Get username from request body
    const username = request.body.username || request.body.value;
  
    console.log("******************GETUSER**********************");
    console.log("Searching for username:", username);
    
    try {
      const user = await new Promise((resolve, reject) => {
        // Debug: Log the actual SQL query
        const query = `SELECT * FROM Users WHERE name = ?`;
        console.log('Executing query:', query, 'with params:', [username]);
        
        db.get(query, [username], (err, row) => {
          if (err) {
            fastify.log.error("Database error:", err);
            return reject(new Error("Database error"));
          }
          
          console.log("Query result: ", row.name);
          
          if (!row) {
            return reject(new Error(`User not found: ${username}`));
          }
          
          fastify.log.info("User retrieved:", row.name);
          resolve(row);
        });
      });
      ////// LOCAL STORAGE -> return json object 
       
      return reply.send({
        id : user.id,
        name : user.name,
        pokedex_id : user.pokedex_id
      });
    } catch (err) {
      console.error("Error in /get-user:", err.message);
      return reply.code(err.message.includes('not found') ? 404 : 500)
        .send({ error: err.message });
    }
  });
/*
///////////// TMP ////////////////////

fastify.post('/get-user', async (request, reply) => {
  const db = fastify.sqlite.db;

  // Get username from request body
  const username = request.body.username || request.body.value;

  console.log("******************GETUSER**********************");
  console.log("Searching for username:", username);
  
  try {
    const user = await new Promise((resolve, reject) => {
      // Debug: Log the actual SQL query
      const query = `SELECT * FROM Users WHERE name = ?`;
      console.log('Executing query:', query, 'with params:', [username]);
      
      db.get(`SELECT * FROM Users WHERE name = ?`, [username], (err, row) => {
        if (err) {
          fastify.log.error("Database error:", err);
          return reject(new Error("Database error"));
        }
        
        console.log("Query result:", row);
        
        if (!row) {
          return reject(new Error(`User not found: ${username}`));
        }
        
        fastify.log.info("User retrieved:", row);
        resolve(row);
      });
    });
    
    return reply.send(user);
  } catch (err) {
    console.error("Error in /get-user:", err.message);
    return reply.code(err.message.includes('not found') ? 404 : 500)
      .send({ error: err.message });
  }
});
*/



//// EXAMPLE BASE 
/*
  fastify.post('/get-user', async (request, reply) => {
    const db = fastify.sqlite.db;

    //const username = "anis"; // Assuming request.body contains a JSON object with a username field
    const username = request.body.username || request.body.value;
    console.log("******************GETUSER**********************");
    console.log(" username : " + request.body.value); 
    console.log("****************************************");

    try {
      const user = await new Promise((resolve, reject) => {
        db.get(`SELECT * FROM Users WHERE name = ?`, [username], (err, row) => {
          if (err) {
            fastify.log.error("Error retrieving user:", err);
            return reject(new Error (" databases error  "));
          }
          if (!row) {
            return reject(new Error (" User error  "));
          }
          fastify.log.info("User retrieved:", row);
          console.log("****************************************");
          resolve(row);
        });
      });
      return reply.send(user);
    } catch (err) {
      return reply.code(500).send({ error: 'Database error', details: err.message });
    }
  });
  */
}

