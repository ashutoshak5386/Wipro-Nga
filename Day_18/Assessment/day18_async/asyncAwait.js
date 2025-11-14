const fs = require('fs').promises;

async function copyFile() {
  try {
    const data = await fs.readFile('input.txt', 'utf8');

    await new Promise(res => setTimeout(res, 1000));

    await fs.writeFile('output.txt', data);
    console.log('File copied successfully with async/await!');
  } catch (err) {
    console.error('Error:', err);
  }
}

copyFile();
