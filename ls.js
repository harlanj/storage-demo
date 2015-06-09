var proc = require('child_process');
var util = require('util');

var moment = require('moment');
var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var server  = require('http').createServer(app);
process.io  = require('socket.io').listen(server);

// Configuration
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.locals.title = process.env.HOST || 'Aaron ls Storage App';

var directory = process.env.APP_DIR || process.env.CLOUD_DIR || __dirname + '/storage';
var command = util.format('ls -al  %s', directory);

function run() {
  proc.exec(command, function(err, stdout, stderr) {
    if (err || stderr) console.log(err, stderr);
    process.io.emit('output', stdout);
    setTimeout(run, 3000);
  });
}

run();

// Render Index Page
app.get('/', function(req, res) {
  res.render('index');
});

app.get('*', function(req, res) {
  res.redirect(301, '/');
});

app.post('/create', function(req, res) {
  var size = req.body.size * 1024;
  var command = util.format('cd %s && dd if=/dev/zero of=%s.file count=%s bs=%s', directory, moment().toISOString(), size, size);
  proc.exec(command, function(err, stdout, stderr) {
    if (err || stderr) console.log(err, stderr);
    return res.send('file created');
  });
});

server.listen(process.env.PORT || 4343, function(){
  console.log('Aaron ls Storage App listening on port %d', server.address().port);
});
