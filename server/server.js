const path = require('path');
const socketIO = require('socket.io');
const express = require('express');
const http = require('http');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js')

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT||3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.on('join',(params , callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and room name are required');
    }
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    socket.join(params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin',`${params.name} joined the chat`));

    callback();
  });


  socket.on('createMessage',(message, callback)=>{
    console.log('message created : ',message);
    callback();
    io.emit('newMessage', generateMessage(message.from, message.text));
  });

  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('SomeUser',coords.latitude, coords.longitude));
  });

  socket.on('disconnect',()=>{
    let user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left`));
    }
  });
});

server.listen(port, ()=>{
  console.log(`Server is listening to port ${port}`);
});
