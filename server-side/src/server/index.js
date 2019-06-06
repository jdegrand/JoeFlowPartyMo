var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Sentencer = require('sentencer');

const port = 3300;

var color = 'red';

var game = null;

var players = []

var gameChosen = false;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

const colorChange = () => {
    color = color === 'red' ? 'blue' : 'red';
    io.emit("colorChange", color)
};

io.on('connection', function(socket){
  console.log('User connected!');
  socket.on("current", () => {
      socket.emit("colorReturn", color);
  });
  
  socket.on("choseGame", (name) => {
    Sentencer.make("{{ noun }}");
    // gameChosen = true;
    io.emit("returnGame", name);
  });

  socket.on("isGameChosen", () => {
    io.emit("returnIsChosen", gameChosen);
  });

  playerExists = (name) => {
    var exists = false;
    for(var i = 0; i < players.length; i++) {
      if (players[i].name === name) {
        exists = true;
        break;
      }
    }
    return exists;
  };

  socket.on("fetchPlayers", () => {
    io.emit("updatePlayers", players);
  });

  socket.on("newPlayer", (name) =>{
    if (playerExists(name)) {
      io.emit("newPlayerSuccessful", false);
    } else {
      players.push({name: name});
      io.emit("newPlayerSuccessful", true);
      io.emit("updatePlayers", players);
    }
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