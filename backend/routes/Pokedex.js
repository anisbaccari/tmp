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


fastify.post('/Pokedex', async (request,reply) => {

    const db = fastify.sqlite.db 
    console.log(" =*= [/Pokedex] : TRYING to DISPLAY POKEDEX \n*************** ");
    const userID = request.body.value; 
    console.log("\n******************\n");
    console.log("=*= [/Pokedex] : userId : " + userID);
    console.log("\n******************\n");

    try
    {
      const tab = await new Promise( (resolve,reject) => 
      {
          db.all(`SELECT * FROM Pokedex WHERE user_id = ?`, [userID], (err, row) => 
          {
            if(err) return reject(new Error ("database Error")); 
            if(!row) return reject(new Error("user not found")); 
            console.log("\n******************\n");
            console.log("=*= [/Pokedex] : row : " , JSON.stringify(row, null, 2));
            console.log("\n******************\n");
            resolve(row);
          }
            ); 
            }); 
            console.log("\n******************\n");z
            console.log("=*= [/Pokedex] : Pokedox Done !");
            console.log(tab);
            const id = tab.id; 
            console.log("\n******************\n");
            return reply.send({
              success: true,
              pokedex: pokedex
          });
/* 
      /////////////// INJECTION PART 
      
      try{
        
            pokemon = await fastify.inject({
              method: 'POST', 
              url: '/Pokemon/:pokedexId',
              payload: {
                id : pokedexid
              }
            })
            console.log("\n=*= [/Pokedex] : Response send\n");
            return reply.send(tab); 
        } 
    catch(err)
    {
      return reply.code(404).send("=*= [/Pokedex] :(1) Error ******************"); 
    }
    */
  } catch(err)
  {
    return reply.code(404).send("=*= [/Pokedex] :(2) Error ******************");
  } 
  

});

}






/*
fetch("https://pokeapi.co/api/v2/pokemon/pikachu").then(res => { 
    return res.json() 
  }).then(data => console.log(data));
  */