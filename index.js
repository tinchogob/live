var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendfile('index.html');
});

var rnd = function() {
	return Math.floor((Math.random() * 10) + 1);	
};

io.on('connection', function(socket){
	var i = 1;
	while (i <= 1000) {
		setTimeout(function() {
			var line = {
				start_x: (rnd() * 100) % 800,
				start_y: (rnd() * 100) % 800,
				end_x: (rnd() * 100) % 600,
				end_y: (rnd() * 100) % 600,
			};
			console.log(JSON.stringify(line));
			io.emit('line', line);
		}, i*500);
		i++
	}
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});