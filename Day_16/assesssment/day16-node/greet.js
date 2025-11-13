// greet.js
const name = process.argv[2];

if (!name) {
  console.log('Usage: node greet.js <Name>');
  process.exit(1);
}

const now = new Date();
const formatted = now.toLocaleString('en-US', {
  weekday: 'short',
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true
});

console.log(`Hello, ${name}! Today is ${formatted}.`);
