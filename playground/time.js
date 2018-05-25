var moment = require('moment')
// var date = moment();

// var date = new Date();
// console.log(date.getMonth());

// date.add(1,'years').subtract(9,'months')
// console.log(date.format('MMM Do YYYY'));
// console.log(date.format('h:mm:ss a'));

new Date().getTime()
var someTimestamp = moment().valueOf()
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log(date.format('h:mm a'));
