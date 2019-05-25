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

function checkLogin(req, res){
  const { username, password } = req.body
  console.log(req.body)
}
