var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendfile('index.html');
});

var rnd = function() {
	return Math.floor((Math.random() * 10) + 1);	
};

var colors = ["red", "blue", "green", "yellow"];

io.on('connection', function(socket){
	var i = 1;
	while (i <= 1000) {
		setTimeout(function() {
			var event = {
				color: colors[rnd() % colors.length],
				pos_x: (rnd() * 100) % 600,
				pos_y: (rnd() * 100) % 600,
			};
			console.log(JSON.stringify(event));
			io.emit('event', event);
		}, i*100);
		i++
	}
	
	socket.on("disconnected", function() {
		console.log("user disconnected");
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
