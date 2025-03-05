import fp from 'fastify-plugin';
import sqlite3 from 'sqlite3';
import mkdirp from 'mkdirp';

async function dbConnector (fastify, options) {
  mkdirp.sync('./database');
  
  var db = new sqlite3.Database('./database/data.db');
  
  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS Pokemon ( \
      id INTEGER PRIMARY KEY, \
      name TEXT NOT NULL, \
      email TEXT NOT NULL \
    )");
  });
  
  db.run(
    `INSERT INTO Pokemon (name, email) VALUES (?, ?)`,
    ["Dr. Smith", "drsmith@example.com"],
    function(err) {
      if (err) {
        fastify.log.error("Error inserting professor:", err);
        return;
      }
  });
  const sqlite = {
  }
  sqlite.db = db
  
  fastify.decorate('sqlite', sqlite)
}

export default fp(dbConnector);