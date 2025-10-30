// This file defines Person and Student classes demonstrating OOP concepts in TypeScript.
export class Person {
    constructor(name, age, institute) {
        this.name = name;
        this.age = age;
        this.institute = institute;
        this.id = ++Person.counter;
    }
    // Public method to greet
    greet() {
        return `Hello, my name is ${this.name}, I am ${this.age} years old and I study at ${this.institute}. My ID is ${this.id}.`;
    }
    // Protected getter for age (accessible in subclasses)
    getAge() {
        return this.age;
    }
    // Public method to show private ID
    showId() {
        return this.id;
    }
    // Static getter to access current counter
    static getCounter() {
        return Person.counter;
    }
}
Person.counter = 0;
// Student class extending Person
export class Student extends Person {
    constructor(name, age, institute, skills = []) {
        super(name, age, institute);
        this.skills = skills;
    }
    // Method to get student details
    getStudentDetails() {
        return `${this.greet()} I currently have ${this.skills.length} skill(s).`;
    }
    // Method to add a new skill
    addSkill(skill) {
        this.skills.push(skill);
        console.log(`Skill "${skill}" added successfully.`);
    }
    // Method to display protected age and skills
    display() {
        console.log(`My age is ${this.getAge()} years and my skills are: ${this.skills.join(", ")}.`);
    }
    // Override greet() method
    greet() {
        return `Hello, my name is ${this.name}, I am ${this.age} years old and I study at ${this.institute}. I have the following skills: ${this.skills.join(", ")}.`;
    }
}
