/**
 * EJERCICIO: Anagrama Grouper
 * 
 * Dado un array de strings, agrupa todas las palabras que son anagramas entre sí.
 * Dos palabras son anagramas si contienen las mismas letras en diferente orden.
 * 
 * Ejemplo:
 * Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
 * Output: [["eat","tea","ate"], ["tan","nat"], ["bat"]]
 * 
 * ¿Por qué usar Map?
 * - Necesitamos agrupar por una "clave" (las letras ordenadas)
 * - La clave es un string, pero queremos asociar arrays como valores
 * - Map nos permite tener una estructura clave-valor eficiente
 */

function groupAnagrams(words: string[]): string[][] {
    const groupsOfAnagrams = new Map<string, string[]>();
    
    words.forEach(word => {
        // Create a unique key by sorting the letters
        const id = word.split('').sort().join('');
        const value = groupsOfAnagrams.get(id);
        const newValue = value ? [...value, word] : [word];
        groupsOfAnagrams.set(id, newValue);
    });

    return Array.from(groupsOfAnagrams.values());
}

function main() {
    console.log("=== Anagram Grouper ===\n");

    console.log("Test 1:");
    const result1 = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);
    console.log(result1);
    console.log("Expected: [['eat','tea','ate'], ['tan','nat'], ['bat']]\n");

    console.log("Test 2:");
    const result2 = groupAnagrams([""]);
    console.log(result2);
    console.log("Expected: [['']]\n");

    console.log("Test 3:");
    const result3 = groupAnagrams(["a"]);
    console.log(result3);
    console.log("Expected: [['a']]\n");

    console.log("Test 4:");
    const result4 = groupAnagrams(["abc", "bca", "cab", "xyz", "zyx", "yxz"]);
    console.log(result4);
    console.log("Expected: [['abc','bca','cab'], ['xyz','zyx','yxz']]\n");

    console.log("✅ All tests completed!");
}

main();

