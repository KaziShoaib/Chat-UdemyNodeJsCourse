const path = require('path');
const socketIO = require('socket.io');
const express = require('express');
const http = require('http');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT||3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.emit('newMessage',generateMessage('admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('admin','new user joined the chat'));

  socket.on('createMessage',(message)=>{
    console.log('message created : ',message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   test: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log('client disconnected');
  });
});

server.listen(port, ()=>{
  console.log(`Server is listening to port ${port}`);
});
