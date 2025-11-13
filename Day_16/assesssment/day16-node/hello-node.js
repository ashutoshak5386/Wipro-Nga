// hello-node.js
// Prints Node version, file & dir info, and a repeating message (stops after 10s)

console.log('Node.js version:', process.version);
console.log('Current file:', __filename);
console.log('Current directory:', __dirname);

let count = 0;
const interval = setInterval(() => {
  count += 1;
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] Welcome to Node.js — message #${count}`);
}, 3000);

// stop after 10 seconds (bonus)
setTimeout(() => {
  clearInterval(interval);
  console.log('Stopped the interval after 10 seconds.');
}, 10000);
