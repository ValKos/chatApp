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
  var formattedTime = moment(msg.createdAt).format('h:mm:ss a')
  var li = $('<li></li>');
  li.text(`${formattedTime}-${msg.from}: ${msg.text}`)
  $('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm:ss a')
  var template = $('#location-message-template').html()// call a script at index.html
  var html = Mustache.render(template, {
    location: message.url,
    from: message.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);
  $('a').attr('href',message.url)
  // var li = $('<li></li>');
  // var a = $('<a target="_blank">My current location</a>')
  // li.text(`${formattedTime} ${message.from}: `)
  // $('a').attr('href',message.url)
  // li.append(a)
  // $('#messages').append(li);
})

socket.on('newMsg', function (msg) { //Listen the server
  var formattedTime = moment(msg.createdAt).format('h:mm:ss a')
  var template = $('#message-template').html()// call a script at index.html
  var html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });
  $('#messages').append(html);




  // var li = $('<li></li>');
  // li.text(`${formattedTime}-${msg.from}: ${msg.text}`)
  // $('#messages').append(li);
})

// socket.emit('createMsg', { //Emitting from the client to server
//   from: 'Peter',
//   text: 'Hey. This is me'
// }, function (d) {
//   console.log(d);
// })


$("#msg").on('submit',function (e) {
  e.preventDefault();
  var messageTextBox = $('[name=message]')

  socket.emit('createMsg', {
    from: 'user',
    text: messageTextBox.val()
  }, function () {
  messageTextBox.val('')//clear the string after send
  })
})

var locationButton = $('#send-location');
locationButton.on('click',function () {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported.')
  }

  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    })
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location')
  })
})
