let moment = require('moment');

// let date = new Date();
// console.log(date.getMonth());


//Feb 9th 2019 00:00:00 am
let date = moment();
// date.add(100,'years').subtract(9,'months');
console.log(date.format('MMM Do, YYYY, hh:mm:ss a'));


//9:03 am

// let date = moment();
// date.subtract(3,'hours').subtract(35, 'm');
// console.log(date.format('h:mm a'));

// let createdAt = 3600;
// let date = moment(createdAt);
// console.log(date);
// console.log(moment().valueOf());
