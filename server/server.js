const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage', {
    from: 'mike',
    text: 'see you then',
    createdAt: 123
  });

  socket.on('createMessage', (message) =>{
    console.log('creatmessage', message)
  })
  socket.on('disconnect', ()=> {
    console.log('client disconnected')
  });
});

server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
