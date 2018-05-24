var socket = io();

socket.on('connect', function () {
  console.log('Connected to server (Server is ONLINE)');

//   socket.emit('createMessage', { //Emitting from the client to server
//     from: 'Peter',
//     text: 'Hey. This is me'
//   })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server (Server is Offline)');
});

socket.on('newMessage', function (msg) { //Listen the server
  console.log('New message recieved from the server!', msg);
})
