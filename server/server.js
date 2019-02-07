const path = require('path');
const socketIO = require('socket.io');
const express = require('express');
const http = require('http');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT||3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('new user connected');

  socket.emit('newMessage',{
    from: "admin",
    text: "welcome to the chat app",
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from:"admin",
    text:"new user joined the app",
    createdAt: new Date().getTime()
  });

  socket.on('createMessage',(message)=>{
    console.log('message created : ',message);
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
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
