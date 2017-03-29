var express = require('express');
var app = express();

app.use(express.static(__dirname));

app.all('/', function(req, res) {
    res.sendFile(__dirname + '/dist/index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 8080!');
});