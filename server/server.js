const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage, generateLocationMessage}= require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');
    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app'))


    socket.broadcast.emit('newMessage',generateMessage('Admin', 'new user joined'))


    socket.on('createMessage', (message, callback) =>{
      console.log('creatmessage', message);
      io.emit('newMessage', generateMessage(message.from, message.text));
      callback();
      });

    socket.on('createLocationMessage', (coords)=>{
      io.emit('newLocationMessage', generateLocationMessage('admin', coords.latitude, coords.longitude))
    });

  socket.on('disconnect', ()=> {
    console.log('client disconnected')
  });
});


server.listen(port, () => {
  console.log(`server is up on port ${port}`);
});
