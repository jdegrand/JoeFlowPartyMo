var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Sentencer = require('sentencer');

const port = 3300;

var color = 'red';

var game = null;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const colorChange = () => {
    color = color === 'red' ? 'blue' : 'red';
    io.emit("colorChange", color)
}

io.on('connection', function(socket){
  console.log('User connected!');
  socket.on("current", () => {
      socket.emit("colorReturn", color)
  });
  
  socket.on("startGame", (name) => {
    Sentencer.make("{{ noun }}")
    io.emit("returnGame", name)
  });

  socket.on("tap", () => {
    colorChange();
  });

  socket.on("disconnect", function() {
      console.log("user disconnected");
  });
});

http.listen(port, function(){
  console.log(`listening on *:${port}`);
});