/**
 * EJERCICIO: Find Duplicates
 * 
 * Dado un array de números, encuentra todos los números que aparecen más de una vez.
 * 
 * Ejemplo:
 * Input: [4,3,2,7,8,2,3,1]
 * Output: [2,3]
 * 
 * ¿Por qué usar Set?
 * - Operaciones O(1) para add() y has()
 * - Perfecto para tracking de elementos ya vistos
 * - Automáticamente evita duplicados en el resultado
 */

function findDuplicates(nums: number[]): number[] {
    const repeated = new Set<number>();

    for (let i = 0; i < nums.length; i++) {
        let found = 0;
        for (let j = i; j < nums.length; j++) {
            if (nums[i] === nums[j]) { found++; }
        }
        if (found > 1) {
            repeated.add(nums[i] as number);
        }
    }

    return Array.from(repeated);
}

function main() {
    console.log("=== Find Duplicates ===\n");

    console.log("Test 1: [4,3,2,7,8,2,3,1]");
    const result1 = findDuplicates([4,3,2,7,8,2,3,1]);
    console.log("Result:", result1);
    console.log("Expected: [2,3]\n");

    console.log("Test 2: [1,1,2]");
    const result2 = findDuplicates([1,1,2]);
    console.log("Result:", result2);
    console.log("Expected: [1]\n");

    console.log("Test 3: [1,2,3,4,5]");
    const result3 = findDuplicates([1,2,3,4,5]);
    console.log("Result:", result3);
    console.log("Expected: []\n");

    console.log("Test 4: [1,1,1,1]");
    const result4 = findDuplicates([1,1,1,1]);
    console.log("Result:", result4);
    console.log("Expected: [1]\n");

    console.log("✅ All tests completed!");
}

main();

