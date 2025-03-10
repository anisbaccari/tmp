import fp from 'fastify-plugin';
import sqlite3 from 'sqlite3';
import mkdirp from 'mkdirp';

async function dbConnector(fastify, options) {
  mkdirp.sync('./database');

  const db = new sqlite3.Database('./database/data.db');

  db.serialize(function () {
    ///// USERS TABLE (Each user has one Pokedex) /////
    db.run(`CREATE TABLE IF NOT EXISTS Users ( 
      id INTEGER PRIMARY KEY, 
      name TEXT NOT NULL, 
      email TEXT NOT NULL UNIQUE, 
      pokedex_id INTEGER UNIQUE, 
      FOREIGN KEY (pokedex_id) REFERENCES Pokedex(id) ON DELETE SET NULL
    )`);

    ///// POKEDEX TABLE (Each Pokedex belongs to one User) /////
    db.run(`CREATE TABLE IF NOT EXISTS Pokedex ( 
      id INTEGER PRIMARY KEY, 
      user_id INTEGER UNIQUE, 
      FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
    )`);

    ///// POKEMON TABLE (Each Pokemon belongs to one Pokedex) /////
    db.run(`CREATE TABLE IF NOT EXISTS Pokemon ( 
      id INTEGER PRIMARY KEY, 
      name TEXT NOT NULL, 
      img TEXT, 
      attack TEXT NOT NULL, 
      pokedex_id INTEGER, 
      FOREIGN KEY (pokedex_id) REFERENCES Pokedex(id) ON DELETE CASCADE
    )`);

    ///// INSERT A SAMPLE USER WITH A POKEDEX /////
    db.run(
      `INSERT INTO Pokedex DEFAULT VALUES`, // Creates an empty Pokedex entry
      function (err) {
        if (err) {
          fastify.log.error("Error creating Pokedex:", err);
          return;
        }
        const pokedexId = this.lastID;

        db.run(
          `INSERT INTO Users (name, email, pokedex_id) VALUES (?, ?, ?)`,
          ["anis", "drsmith@example.com", pokedexId],
          function (err) {
            if (err) {
              fastify.log.error("Error inserting User:", err);
              return;
            }
          }
        );
      }
    );

    ///// INSERT A SAMPLE POKEMON LINKED TO A POKEDEX /////
    db.run(
      `INSERT INTO Pokemon (name, img, attack, pokedex_id) VALUES (?, ?, ?, ?)`,
      [
        "Pikachu",
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png",
        "Thunderbolt",
        1, // Pokedex ID (assuming Dr. Smith's Pokedex has ID 1)
      ],
      function (err) {
        if (err) {
          fastify.log.error("Error inserting Pokemon:", err);
          return;
        }
      }
    );
  });

  fastify.decorate('sqlite', { db });
}

export default fp(dbConnector);