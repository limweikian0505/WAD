const sqlite3 = require('sqlite3').verbose();

// Open database
const db = new sqlite3.Database('myplaces.sqlite');

// Drop table if exists
db.serialize(() => {
  db.run('DROP TABLE IF EXISTS places');

  // Create table
  db.run(`
    CREATE TABLE places(
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      city TEXT NOT NULL,
      date INTEGER NOT NULL
    )
  `);

  // Insert data
  const stmt = db.prepare(`
    INSERT INTO places(name, city, date)
    VALUES (?, ?, ?)
  `);

  stmt.run('Forbidden City', 'Beijing', 1274716800000);
  stmt.run('Victoria Harbour', 'Hong Kong', 1385481600000);
  stmt.run('Yarra Valley', 'Melbourne', 1460908800000);
  stmt.run('Gamcheon Cultural Village', 'Busan', 1495468800000);
  stmt.run('The Pinnacles', 'Perth', 1508688000000);

  stmt.finalize();
});

// Close database
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Database closed.');
});