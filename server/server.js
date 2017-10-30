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
      from:'Admin',
      text: 'welcome to the chat app',
      createdAt: new Date().getTime()
    });
    socket.broadcast.emit('newMessage', {
      from: 'Admin',
      test: 'New User Joined',
      createdAt: new Date().getTime()
    });
    socket.on('createMessage', (message) =>{
      console.log('creatmessage', message);
      io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', ()=> {
    console.log('client disconnected')
  });
});






  //   socket.broadcast.emit('newMessage', {
  //     from: message.from,
  //     text: message.text,
  //     createdAt: new Date().getTime()
  //   });
  // });


server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
