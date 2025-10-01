# Anagram Grouper

Group words that are anagrams of each other using the Map data structure.

## Problem

Given an array of strings, group all anagrams together. Two words are anagrams if they contain the same letters in different order.

## Example

**Input:** `["eat", "tea", "tan", "ate", "nat", "bat"]`

**Output:** `[["eat","tea","ate"], ["tan","nat"], ["bat"]]`

## Why use Map?

- Need to group by a key (sorted letters)
- Key is a string, values are arrays
- Map provides efficient key-value storage

## Running this exercise

From the **root** of the monorepo:
```bash
pnpm --filter @code-playground/ts-anagram-grouper start
```

Or navigate to this directory:
```bash
cd exercises/typescript/anagram-grouper
pnpm start
```

## What you'll practice

- Using Map for grouping
- String manipulation
- Array operations

