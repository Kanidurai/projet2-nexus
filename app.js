const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected');
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/feedback', (req, res) => {
  const { name, email, feedback } = req.body;
  const sql = 'INSERT INTO feedback (name, email, feedback) VALUES (?, ?, ?)';
  db.query(sql, [name, email, feedback], (err, result) => {
    if (err) throw err;
    console.log('Feedback submitted');
    res.redirect('/');
  });
});

// Server
const PORT = process.env.PORT || 3050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
