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


fastify.post('/Pokedex', async (request, reply) => {
  const db = fastify.sqlite.db;
  const userID = request.body.value;

  console.log("=*= [/Pokedex] : TRYING to DISPLAY POKEDEX");
  console.log("UserID:", userID);

  try {
      const tab = await new Promise((resolve, reject) => {
          db.all(`SELECT * FROM Pokedex WHERE user_id = ?`, [userID], (err, rows) => {
              if (err) {
                  console.error("Database Error:", err);
                  return reject(new Error("Database Error"));
              }
              if (!rows || rows.length === 0) {
                  return reject(new Error("No Pokedex found"));
              }
              
              // Move all logging inside the callback
              console.log("\n******************\n");
              console.log("=*= [/Pokedex] : rows:", JSON.stringify(rows, null, 2));
              const pokedex_id = rows[0].id;
              console.log("\n=*= [/Pokedex]  : pokedex_id : \n",pokedex_id);
              console.log("\n******************\n");
              
              db.all(`SELECT p.* 
                FROM Pokemon p
                WHERE p.pokedex_id = ?`,[pokedex_id],(err,pokedex_rows) =>
                {
                    if(err)
                    {
                      console.error("[QUERY] pokmon/pokedex_id : error : ", err); 
                      return reject(new Error("[QERY] Error")); 
                    }
                    if( !pokedex_rows || pokedex_rows.length === 0)
                        return reject( new Error("[QUERY] : pokedex_rows Errror"));
                    console.log("\n******************\n");
                    console.log("=*= [/Pokedex] - [QUERY]: pokedex_rows:", JSON.stringify(pokedex_rows, null, 2));
                    console.log("\n******************\n");
                    
                    resolve(pokedex_rows);
                });


              return rows;
          });
      });

      // After await, we can use the resolved data
      return reply.send({
          success: true,
          pokedex: tab
      });

  } catch (err) {
      console.error("Error in /Pokedex:", err.message);
      return reply.code(404).send({
          success: false,
          error: err.message
      });
  }
});

}






/*
fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then(res => { 
    return res.json() 
  }).then(data => console.log(data));
  */