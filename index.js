var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    socket,
    port = (process.env.PORT || 8080);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static('./public/css'));
app.use('/js', express.static('./public/js'));

app.get('/', function(req, res) {
  console.log('GET /');

  res.sendFile('index.html', { root: __dirname + '/public/' });
});

app.post('/', function(req, res) {
  console.log('POST /');
  console.log(req.body);

  if (socket) {
    // socket.emit('data', req.body);
    // socket.broadcast.emit('data', req.body);
    io.emit('data', req.body);
  }

  res.json(req.body);
});

io.on('connection', function(sock) {
  socket = sock;
  socket.on('data', function(message) {
    console.log('Socket.io [data]', message);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});