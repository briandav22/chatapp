const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const {generateMessage}= require('./utils/message');

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
      callback('this is from the server');
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
