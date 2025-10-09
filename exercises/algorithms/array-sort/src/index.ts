/*
Exercise to practice Array.prototype.sort in JavaScript/TypeScript:

1. You have the following array of objects:
*/
const products = [
  { name: 'Laptop', price: 1200, rating: 4.5 },
  { name: 'Mouse', price: 25, rating: 4.9 },
  { name: 'Keyboard', price: 75, rating: 4.2 },
  { name: 'Monitor', price: 300, rating: 4.6 },
  { name: 'USB Cable', price: 10, rating: 4.1 }
];
/*

2. Implement functions that return **new arrays** sorted by:
   - **price** in ascending order.
   - **rating** in descending order.
   - **name** alphabetically (case-insensitive).

3. Requirements:
   - Do not mutate the original array.
   - For case-insensitive string sorting, use localeCompare or convert strings to lowercase.
*/

interface Product {
    name: string;
    price: number;
    rating: number;
}

function orderByPrice(products: Product[]): Product[] {
    return [...products].sort((a, b) => a.price - b.price);
}

function orderByRating(products: Product[]): Product[] {
    return [...products].sort((a, b) => b.rating - a.rating);
}

function orderByName(products: Product[]): Product[] {
    return [...products].sort((a, b) => 
        a.name.localeCompare(b.name, "en", { sensitivity: "base" })
    );
}

function main() {
    console.log("=== Array Sort Practice ===\n");

    console.log("Original products:");
    console.table(products);

    console.log("\nSorted by Price (ascending):");
    const byPrice = orderByPrice(products);
    console.table(byPrice);

    console.log("\nSorted by Rating (descending):");
    const byRating = orderByRating(products);
    console.table(byRating);

    console.log("\nSorted by Name (alphabetically):");
    const byName = orderByName(products);
    console.table(byName);

    // Assertions
    console.assert(
        JSON.stringify(byPrice.map(p => p.name)) === 
        JSON.stringify(['USB Cable', 'Mouse', 'Keyboard', 'Monitor', 'Laptop']),
        'OrderPrice failed'
    );
    console.assert(
        JSON.stringify(byRating.map(p => p.name)) === 
        JSON.stringify(['Mouse', 'Monitor', 'Laptop', 'Keyboard', 'USB Cable']),
        'OrderRating failed'
    );
    console.assert(
        JSON.stringify(byName.map(p => p.name)) === 
        JSON.stringify(['Keyboard', 'Laptop', 'Monitor', 'Mouse', 'USB Cable']),
        'OrderName failed'
    );

    console.log("\n✅ All assertions passed!");
}

main();

