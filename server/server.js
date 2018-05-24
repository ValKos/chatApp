const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected (Tab was created)');

  // socket.emit('newMessage', {//Emitting from the server to the client (address one connection)
  //   from: 'Ann',
  //   text: 'Whatsup?',
  //   createAt: '01/01/2015'
  // });

  socket.on('createMessage',(message) => { //Listen the client
    console.log('Msg:',message);
    io.emit('newMessage',{//(address all connections)
        from: message.from,
        text: message.text,
        createAt: new Date().getTime()
    })
  })

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
