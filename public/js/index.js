var socket = io();

socket.on('connect', function () {
  console.log('Connected to server (Server is ONLINE)');
// socket.emit('createMessage', { //Emitting from the client to server
//   from: 'Peter',
//   text: 'Hey. This is me'
// })
});

socket.on('disconnect', function () {
  console.log('Disconnected from server (Server is Offline)');
});

socket.on('wMsg', function (msg) { //Listen the server
  console.log(msg);
  var li = $('<li></li>');
  li.text(`${msg.from}: ${msg.text}`)
  $('#messages').append(li);
})

socket.on('newMsg', function (msg) { //Listen the server
  console.log(msg);
  var li = $('<li></li>');
  li.text(`${msg.from}: ${msg.text}`)
  $('#messages').append(li);
})

// socket.emit('createMsg', { //Emitting from the client to server
//   from: 'Peter',
//   text: 'Hey. This is me'
// }, function (d) {
//   console.log(d);
// })


$("#msg").on('submit',function (e) {
  e.preventDefault();

  socket.emit('createMsg', {
    from: 'user',
    text: jQuery('[name=message]').val()
  }, function () {

  })
})
