let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname+'/Client/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
})

let port = process.env.PORT || 3000;

http.listen(port, () => {
  console.log('listening on *:3000');
});