// this is a typescript file that prints "Hello World!" to the console with the help of a function.
function greeting(name: string): string{
    return `Hello, ${name}!`;
}
const message : string = greeting("World");
console.log(message);