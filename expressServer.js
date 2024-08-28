const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const data = [
  { id: 1, name: "John Doe", age: 28 },
  { id: 2, name: "Jane Smith", age: 34 },
];

app.get('/api/users', (req, res) => {
  res.json(data);
});

app.listen(4000, () => {
  console.log('RESTful API running on http://localhost:4000/api/users');
});