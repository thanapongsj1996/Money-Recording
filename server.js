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
app.post('/add', addTransaction)
app.get('/edit', showEditData)
app.post('/edit', updateData)
app.post('/delete', deleteData)



function saveNewUser(req, res) {
  const { username, password } = req.body
  // console.log(req.body)
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
  // console.log(req.body)
  pool.query(`SELECT id, username FROM users WHERE username='${username}' AND password=sha2('${password}',512)`, (err, result) => {
    if (result.length > 0) {
      console.log(result[0].id, result[0].username)
      res.json({
        success: true,
        message: 'Login seccess',
        userid: result[0].id,
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
  const { username, date } = req.query
  pool.query(`SELECT transactions.id,transactions.userid, transactions.remark, transactions.amount, transactions.date, transactions.type FROM transactions JOIN users ON transactions.userid=users.id WHERE username='${username}' AND transactions.date='${date}'`, (err, result) => {
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

function showEditData(req, res) {
  const { username, id } = req.query
  // console.log(req.query)
  pool.query(`SELECT transactions.amount, transactions.remark, transactions.userid FROM transactions JOIN users ON transactions.userid=users.id WHERE users.username='${username}' AND transactions.id='${id}'`, (err, result) => {
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

function addTransaction(req, res) {
  // console.log(req.body)
  const { userid, remark, amount, type } = req.body
  var date = new Date()
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  var nowDate = year + '-' + month + '-' + day
  console.log(nowDate)
  pool.query(`INSERT INTO transactions (userid, amount, type, remark, date) VALUES ('${userid}','${amount}','${type}','${remark}','${nowDate}')`, (err, result) => {
    if (err) {
      res.json({
        success: false,
        message: err.message
      })
    } else {
      res.json({
        success: true
      })
    }
  })
}

function updateData(req, res) {
  // console.log(req.body)
  const { amount, remark, id } = req.body
  pool.query(`UPDATE transactions SET amount='${amount}', remark='${remark}' WHERE id='${id}'`, (err, result) => {
    if (err) {
      res.json({
        success: false,
        message: err.message
      })
    } else {
      res.json({
        success: true
      })
    }
  })
}

function deleteData(req, res) {
  // const { id } = req.body
  pool.query(`DELETE FROM transactions WHERE id='${id}'`,(err,result)=>{
    if (err) {
      res.json({
        success: false,
        message: err.message
      })
    } else {
      res.json({
        success: true
      })
    }
  })
}