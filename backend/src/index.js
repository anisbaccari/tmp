import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
/// IMPORT DB
import dbCrud from '../plugins/db.js';  
import dbPlugin from '../plugins/Crud/UserCrud.js';  
//// IMPORT ROUTES 
import PokedexRoutes from '../routes/Pokedex.js';
import PokemonRoutes from '../routes/Pokemon.js';
import userRoutes from '../routes/users.js';
import fastifyFetch from 'fastify-fetch'

dotenv.config();

const fastify = Fastify({ logger: true });



// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register plugins
fastify.register(cors, { origin: '*' });
fastify.register(jwt, { secret: process.env.JWT_SECRET });

fastify.register(dbPlugin);  // Register the database plugin
fastify.register(dbCrud);  // Register the CRUD plugin

// Add routes
fastify.register(PokemonRoutes);
fastify.register(PokedexRoutes);
fastify.register(userRoutes);


// Sample route
fastify.get('/', async (request, reply) => {
  return { message: 'CORS is enabled!' };
});


// Start server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log("Server starting on PORT : 3000");
  } catch (er) {
    fastify.log.error(er);
    process.exit(1);
  }
};

start();