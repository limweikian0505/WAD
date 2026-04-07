const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const DB = 'myplaces.sqlite';

// Middleware (like Flask request.json)
app.use(express.json());

// Helper function 
function getRowAsDict(row) {
  return {
    id: row.id,
    name: row.name,
    city: row.city,
    date: row.date,
  };
}

//   GET /api/places
app.get('/api/places', (req, res) => {
  const db = new sqlite3.Database(DB);

  db.all('SELECT * FROM places ORDER BY name', [], (err, rows) => {
    if (err) return res.status(500).json(err);

    const result = rows.map(getRowAsDict);
    res.status(200).json(result);
  });

  db.close();
});

//   GET /api/places/:id
app.get('/api/places/:id', (req, res) => {
  const db = new sqlite3.Database(DB);

  db.get(
    'SELECT * FROM places WHERE id=?',
    [req.params.id],
    (err, row) => {
      if (err) return res.status(500).json(err);

      if (row) {
        res.status(200).json(getRowAsDict(row));
      } else {
        res.status(200).json(null);
      }
    }
  );

  db.close();
});

//  POST /api/places
app.post('/api/places', (req, res) => {
  if (!req.body) return res.sendStatus(404);

  const { name, city, date } = req.body;

  const db = new sqlite3.Database(DB);

  db.run(
    `INSERT INTO places(name, city, date) VALUES (?, ?, ?)`,
    [name, city, date],
    function (err) {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        id: this.lastID,
        affected: this.changes,
      });
    }
  );

  db.close();
});

//   PUT /api/places/:id
app.put('/api/places/:id', (req, res) => {
  if (!req.body || !req.body.id) return res.sendStatus(400);

  if (parseInt(req.body.id) !== parseInt(req.params.id)) {
    return res.sendStatus(400);
  }

  const { name, city, date } = req.body;

  const db = new sqlite3.Database(DB);

  db.run(
    `UPDATE places SET name=?, city=?, date=? WHERE id=?`,
    [name, city, date, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        id: req.params.id,
        affected: this.changes,
      });
    }
  );

  db.close();
});

//   DELETE /api/places/:id
app.delete('/api/places/:id', (req, res) => {
  if (!req.body || !req.body.id) return res.sendStatus(400);

  if (parseInt(req.body.id) !== parseInt(req.params.id)) {
    return res.sendStatus(400);
  }

  const db = new sqlite3.Database(DB);

  db.run(
    `DELETE FROM places WHERE id=?`,
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        id: req.params.id,
        affected: this.changes,
      });
    }
  );

  db.close();
});

//   Start serve 
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});