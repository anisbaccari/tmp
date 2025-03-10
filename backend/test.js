
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