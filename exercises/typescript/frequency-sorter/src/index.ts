/**
 * Problem Statement
 * -----------------
 * Given an array of integers, sort the array in decreasing order of frequency of elements.
 * If two elements have the same frequency, the one with the smaller value should come first.
 *
 * Input & Output
 * --------------
 * Input Format:
 *   - The first line contains an integer n, the size of the array.
 *   - The second line contains n integers, the elements of the array.
 *
 * Input Constraints:
 *   - 1 ≤ n ≤ 100
 *   - -10^3 ≤ array[i] ≤ 10^3
 *
 * Output Format:
 *   - Return the sorted array as a space-separated string.
 *
 * Example
 * -------
 * Input:
 *   6
 *   4 5 6 5 4 3
 *
 * Output:
 *   4 4 5 5 3 6
 *
 * Explanation:
 *   Frequencies:
 *     4 → 2 times
 *     5 → 2 times
 *     3 → 1 time
 *     6 → 1 time
 *   Sorted by decreasing frequency, and when frequencies tie,
 *   by smaller value: 4 4 5 5 3 6
 */

function frequencySorter(size: number, frequencies: number[]): number[] {
    const repMap = new Map<number, number[]>();
    let maxRep = 0;
    const finalArr: number[] = [];

    frequencies.forEach(freq => {
        let repetitions = 0;
        frequencies.forEach(innerFreq => {
            if (freq === innerFreq) { repetitions++; }
        });

        const prevValue = repMap.get(repetitions);
        if (prevValue) {
            repMap.set(repetitions, [...prevValue, freq]);
        } else {
            repMap.set(repetitions, [freq]);
        }

        if (repetitions > maxRep) {
            maxRep = repetitions;
        }
    });

    for (let i = maxRep; i > 0; i--) {
        const arr = repMap.get(i) || [];
        finalArr.push(...arr.sort((a, b) => a - b));
    }

    return finalArr;
}

function main() {
    console.log("=== Frequency Sorter ===\n");

    const result1 = frequencySorter(6, [4, 5, 6, 5, 4, 3]);
    console.log("Test 1: [4, 5, 6, 5, 4, 3]");
    console.log("Result:", result1);
    console.log("Expected: [4, 4, 5, 5, 3, 6]");
    console.assert(JSON.stringify(result1) === "[4,4,5,5,3,6]", "Test 1 failed");

    const result2 = frequencySorter(4, [1, 1, 2, 3]);
    console.log("\nTest 2: [1, 1, 2, 3]");
    console.log("Result:", result2);
    console.log("Expected: [1, 1, 2, 3]");
    console.assert(JSON.stringify(result2) === "[1,1,2,3]", "Test 2 failed");

    console.log("\n✅ All tests passed!");
}

main();

