var path = require('path');
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var existingNotifications = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/existing-notifications', function(req, res){
  res.send(JSON.stringify(existingNotifications));
});

app.post('/test-message', function(req, res){
  existingNotifications.push(req.body.msg);
  if(existingNotifications.length > 5) {
    existingNotifications.shift();
  }
  io.emit('webhook', req.body.msg);
  res.status(200).send(String(existingNotifications.length));
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
