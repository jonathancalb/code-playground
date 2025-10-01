// TypeScript Basic Types Practice

// Primitive types
const myName: string = "TypeScript";
const myAge: number = 5;
const isAwesome: boolean = true;

// Arrays
const numbers: number[] = [1, 2, 3, 4, 5];
const names: Array<string> = ["Alice", "Bob", "Charlie"];

// Tuples
const person: [string, number] = ["John", 30];

// Enums
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

// Interfaces
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
}

const user: User = {
  id: 1,
  name: "Jane Doe",
  email: "jane@example.com"
};

// Functions
function greet(name: string): string {
  return `Hello, ${name}!`;
}

// Generic function
function identity<T>(arg: T): T {
  return arg;
}

// Union types
function printId(id: number | string) {
  console.log(`ID: ${id}`);
}

// Type aliases
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };

// Main
function main() {
  console.log("=== TypeScript Basic Types ===");
  console.log(`Name: ${myName}, Age: ${myAge}, Awesome: ${isAwesome}`);
  console.log(`Numbers: ${numbers.join(", ")}`);
  console.log(`Person: ${person[0]}, ${person[1]}`);
  console.log(`Favorite Color: ${Color.Blue}`);
  console.log(`User: ${user.name} (${user.email})`);
  console.log(greet("TypeScript"));
  console.log(`Identity: ${identity<number>(42)}`);
  printId(123);
  printId("ABC");
  console.log(`Point: (${point.x}, ${point.y})`);
}

main();

