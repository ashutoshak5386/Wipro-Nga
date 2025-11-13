// greet-moment.js
const moment = require('moment');
const name = process.argv[2];

if (!name) {
  console.log('Usage: node greet-moment.js <Name>');
  process.exit(1);
}

const now = moment().format('ddd MMM D YYYY, hh:mm A'); // custom format
console.log(`Hello, ${name}! Today is ${now}.`);
