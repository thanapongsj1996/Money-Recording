const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'build')));
app.listen(9000);

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.post('/register', saveNewUser)



function saveNewUser(req, res){
  console.log(req.body)
  res.json({
    msg:'ok'
  })
}

