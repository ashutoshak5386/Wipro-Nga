const EventEmitter = require('events');
const emitter = new EventEmitter();


emitter.on('userLoggedIn', (name) => {
console.log(`User ${name} logged in.`);
});


emitter.on('userLoggedOut', (name) => {
console.log(`User ${name} logged out.`);
});


emitter.on('sessionExpired', (name) => {
console.log(`Session expired for ${name}.`);
});


const user = 'John';


emitter.emit('userLoggedIn', user);
setTimeout(() => emitter.emit('userLoggedOut', user), 2000);
setTimeout(() => emitter.emit('sessionExpired', user), 5000);