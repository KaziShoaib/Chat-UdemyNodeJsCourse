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

  socket.on('disconnect',()=>{
    console.log('client disconnected');
  });
});

server.listen(port, ()=>{
  console.log(`Server is listening to port ${port}`);
});
