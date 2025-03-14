  export default async function( fastify,options){
    fastify.post('/add-user', async (request,reply) => 
    {
      try{

        const db = fastify.sqlite.db;
        const { name, mail } = request.body;
        
        console.log("=*= [add-user] : request", request.body); 
        // 1. Add new User
        const userId = await new Promise((resolve, reject) => {
          db.run(  `INSERT INTO Users (name, email) VALUES (?, ?)`,
            [name, mail],
            function(err) {
              if (err) reject(err);
              resolve(this.lastID); /// Last User Id generate by SQL 
            }.bind(db)
            
          );
        });
        console.log(`✅ User Created -> ID: ${userId}, Name: ${name}, Email: ${mail}`);
         
        // 2. Create Pokedex
        const pokedexId = await new Promise((resolve, reject) => {
          db.run(
            `INSERT INTO Pokedex (user_id) VALUES (?)`,
            [userId],
            function(err) {
              if (err) reject(err);
              resolve(this.lastID);
            }.bind(db)
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