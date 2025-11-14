const fs = require('fs');

console.log('Before read');

fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Read error:', err);
    return;
  }

  console.log('File content:\n', data);

  setTimeout(() => {
    console.log('Read operation completed');
  }, 1000);
});

console.log('After read');
