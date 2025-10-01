/*
Create a JavaScript/TypeScript function that performs a **join** between two arrays of objects.

Details:
You are given two arrays:
*/

const directory = [
  { "name": "Maggie", "age": 14, "id": 0, "phone": "+123456" },
  { "name": "Joseph", "age": 24, "id": 1, "phone": "+145454" },
  { "name": "Margaret", "age": 11, "id": 2, "phone": "+125556" },
  { "name": "Elizabeth", "age": 61, "id": 3, "phone": "+765756" },
  { "name": "Julio", "age": 24, "id": 4, "phone": "+165756" },
  { "name": "Kevin", "age": 64, "id": 5, "phone": "+888856" },
  { "name": "Martin", "age": 71, "id": 6, "phone": "+12323456" },
  { "name": "Aaron", "age": 30, "id": 7, "phone": "+12434343" }
];

const registrations = [
  { "name": "Maggie", "age": 14, "id": 0, "email": "maggie@notreal.com", "confirmed": true },
  { "name": "Elizabeth", "age": 61, "id": 1, "email": "elizabeth@notreal.com", "confirmed": false },
  { "name": "Martin", "age": 71, "id": 2, "email": "martin@notreal.com", "confirmed": false },
  { "name": "Aaron", "age": 30, "id": 3, "email": "aaron@notreal.com", "confirmed": true }
];

/*
Task:
Write a function that:
- Merges the two arrays on the matching value of the given `key`.
- For each matching pair, returns a single object that combines all properties from both arrays.
- Performance matters: design the solution to avoid unnecessary iterations and achieve good time complexity.

Example:
joinArrays(directory, registrations, "name");
should produce a single array of merged records joined by the "name" property.
*/

type RecordType = Record<string, any>;

function joinArrays(
  leftArray: RecordType[],
  rightArray: RecordType[],
  key: string
): RecordType[] {
  // TODO: Implement the join operation
  // Hint: Use a Map for O(1) lookups instead of nested loops
  
  throw new Error("Not implemented yet - this is your exercise to solve!");
}

function main() {
    console.log("=== Array Join Exercise ===\n");
    console.log("This is a challenge exercise - implement the joinArrays function!\n");
    
    console.log("Directory:", directory.length, "entries");
    console.log("Registrations:", registrations.length, "entries");
    
    // Uncomment when you implement the function:
    // const result = joinArrays(directory, registrations, "name");
    // console.log("\nJoined result:");
    // console.table(result);

    console.log("\n📝 Your task:");
    console.log("1. Implement joinArrays() to merge arrays by a common key");
    console.log("2. Use Map for O(n) performance instead of O(n²) nested loops");
    console.log("3. Combine all properties from matching records");
    console.log("4. Decide how to handle non-matching records\n");
}

main();

