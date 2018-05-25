// io.emit lets the server send an event to all the connected clients
// at once. This is useful when you need to send some data to everyone.
// This is why we use io.emit for emitting newMessage. This is
// something we want everyone to be able to see.
//
// socket.emit sends an event to a single socket. This is great when
// you need to send an event to a single user. This is why we use
// socket.emit when sending out the greeting message. It only needs to
// go to that one user.


const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocation} = require('./utils/message')
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
    // socket.broadcast.emit('newMessage',{ //emit to all except newly joined
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime()
    // })

    socket.emit('wMsg', generateMessage('Admin','Welcome to the chat'))

    socket.broadcast.emit('newMsg', generateMessage('Admin','New user joined'))

  //socket.emit from admin text 'welcome'
  //socket.broadcast.emit from admin text 'new user joined'

  socket.on('createMsg',function (message,fn) { //Listen to the client...

    console.log('Msg:',message);
    io.emit('newMsg', generateMessage(message.from,message.text));//...and then emit to all clients(address all connections)
    fn();

    // socket.on('disconnect', () => {
    //   console.log('User was disconnected');
    // });
  });
socket.on('createLocationMessage', (coords) => {
  io.emit('newLocationMessage',generateLocation('Admin', coords.latitude, coords.longitude))
})
})

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
