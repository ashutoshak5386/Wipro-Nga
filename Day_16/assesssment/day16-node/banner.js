// banner.js
const figlet = require('figlet');
const chalk = require('chalk');

figlet.text('Welcome to Node.js', {
  horizontalLayout: 'default',
  verticalLayout: 'default'
}, (err, data) => {
  if (err) {
    console.error('Figlet error:', err);
    return;
  }
  // Used chalk for colored output (choose any chalk method)
  console.log(chalk.bold.green(data));
  console.log(chalk.blue('Started at:'), new Date().toLocaleString());
});
