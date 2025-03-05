import Fastify from 'fastify';
import dotenv from 'dotenv';
import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import path from 'path';
import fastifyStatic from '@fastify/static';
import { fileURLToPath } from 'url';
import dbPlugin from '../plugins/db.js';  
import userRoutes from '../routes/users.js';
import fastifyFetch from 'fastify-fetch'

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(fastifyFetch); // Register the fetch plugin

// Add routes
fastify.register(userRoutes);

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