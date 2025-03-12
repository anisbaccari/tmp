 /*
 export default async function (fastify, options) {
    fastify.get('/add-user', async (request, reply) => {
      const db = fastify.sqlite.db;
      
      console.log("****************** ADDING USER & POKEDEX ***********");
      const name = request.body; 
      console.log("=*= [add-user] : request.body", name); 
      try {
        // 1. Add new User
        const userId = await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO Users (name, email) VALUES (?, ?)`,
            ["Ash Ketchum", "ash@example.com"],
            function(err) {
              if (err) reject(err);
              resolve(this.lastID);
            }
          );
        });
        console.log(`✅ User Created -> ID: ${userId}, Name: Ash Ketchum, Email: ash@example.com`);
  
        // 2. Create Pokedex
        const pokedexId = await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO Pokedex (user_id) VALUES (?)`,
            [userId],
            function(err) {
              if (err) reject(err);
              resolve(this.lastID);
            }
          );
        });
        console.log(`✅ Pokedex Created -> ID: ${pokedexId}, User_ID: ${userId}`);
  
        // 3. Link Pokedex to User
        await new Promise((resolve, reject) => {
          db.run(
            `UPDATE Users SET pokedex_id = ? WHERE id = ?`,
            [pokedexId, userId],
            function(err) {
              if (err) reject(err);
              resolve();
            }
          );
        });
        console.log(`🔗 Pokedex Linked -> User_ID: ${userId} now owns Pokedex_ID: ${pokedexId}`);
  
        // Single reply at the end
        return reply.send({ 
          message: "User and Pokedex created successfully!", 
          userId, 
          pokedexId 
        });
  
      } catch (err) {
        console.error("Database error:", err);
        return reply.code(500).send({ 
          error: "Database error", 
          details: err.message 
        });
      }
    });
  }
 */

  export default async function( fastify,options){
    fastify.post('/add-user', async (request,reply) => 
    {
      try{

        const db = fastify.sqlite.db;
        const { username, email } = request.body;
        
        console.log("=*= [add-user] : request.body", username); 
        // 1. Add new User
        const userId = await new Promise((resolve, reject) => {
          db.run(  `INSERT INTO Users (name, email) VALUES (?, ?)`,
            [username, email],
            function(err) {
              if (err) reject(err);
              resolve(this.lastID); /// Last User Id generate by SQL 
            }
            
          );
        });
        console.log(`✅ User Created -> ID: ${userId}, Name: ${username}, Email: ${email}`);
         
        // 2. Create Pokedex
        const pokedexId = await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO Pokedex (user_id) VALUES (?)`,
            [userId],
            function(err) {
              if (err) reject(err);
              resolve(this.lastID);
            }
          );
        });
        console.log(`✅ Pokedex Created -> ID: ${pokedexId}, User_ID: ${userId}`);

          // 3. Link Pokedex to User
        await new Promise((resolve, reject) => {
          db.run(
            `UPDATE Users SET pokedex_id = ? WHERE id = ?`,
            [pokedexId, userId],
            function(err) {
              if (err) reject(err);
              resolve();
            }
          );
        });
        console.log(`🔗 Pokedex Linked -> User_ID: ${userId} now owns Pokedex_ID: ${pokedexId}`);
  
        // Single reply at the end
        return reply.send({ 
          message: "User and Pokedex created successfully!", 
          userId, 
          pokedexId 
        });
      }catch (err) {
        console.error("Database error:", err);
        return reply.code(500).send({ 
          error: "Database error", 
          details: err.message 
        });
      }
  });
} 
