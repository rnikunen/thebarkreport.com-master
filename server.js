var express = require('express');
var lessMiddleware = require('less-middleware');
var fs = require('fs');
var http = require('http');

var config = require('./config');
var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(lessMiddleware({
    src      : __dirname + "/public",
    compress : true
  }));
app.use(express.static(__dirname + '/public'));


var file = __dirname + '/views/api_model.json';
 
fs.readFile(file, 'utf8', function (err, data) {
  if (err) { console.log('Error: ' + err); return; }
  apipage = JSON.parse(data);
});

app.get('/', function(req, res) {
  res.render('index', { proxyUrl: config.proxyUrl, page: apipage });
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Listening on port %d', port);
