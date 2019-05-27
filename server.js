const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mysql = require('mysql')

const sql_url = 'mysql://root:boyboy5678@localhost/moneyRecord'
const pool = mysql.createPool(sql_url)

app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));
app.listen(9000);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.post('/register', saveNewUser)
app.post('/login', checkLogin)
app.get('/home', showData)



function saveNewUser(req, res) {
  const { username, password } = req.body
  console.log(req.body)
  pool.query(`SELECT * FROM users WHERE username='${username}'`, (err, result) => {
    if (result.length > 0) {
      res.json({
        success: false,
        message: 'Your username has been used, Please try again.'
      })
    } else {
      pool.query(`INSERT INTO users (username, password) VALUES ('${username}',sha2('${password}',512))`, (err, result) => {
        if (err) {
          res.json({
            success: false,
            message: err.message
          })
        } else {
          res.json({
            success: true,
            message: 'Successfully, Account created.'
          })
        }
      })
    }
  })
}

function checkLogin(req, res) {
  const { username, password } = req.body
  console.log(req.body)
  pool.query(`SELECT id, username FROM users WHERE username='${username}' AND password=sha2('${password}',512)`, (err, result) => {
    if (result.length > 0) {
      console.log(result[0].id, result[0].username)
      res.json({
        success: true,
        message: 'Login seccess',
        profile: username
      })
    } else {
      res.json({
        success: false,
        message: 'Login failed'
      })
    }
  })
}

function showData(req, res) {
  const username = req.query.username
  console.log(username)
  pool.query(`SELECT transactions.remark, transactions.amount, transactions.date, transactions.type FROM transactions JOIN users ON transactions.userid=users.id WHERE username='${username}'`, (err, result) => {
    if (err) {
      res.json({
        success: false,
        message: 'Query failed'
      })
    } else {
      res.json({
        results: result
      })
    }
  })
}