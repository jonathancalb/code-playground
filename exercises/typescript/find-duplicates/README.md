# Find Duplicates

Find all numbers that appear more than once in an array using the Set data structure.

## Problem

Given an array of numbers, return all numbers that appear more than once.

## Example

**Input:** `[4,3,2,7,8,2,3,1]`

**Output:** `[2,3]`

## Why use Set?

- O(1) operations for `add()` and `has()`
- Perfect for tracking elements already seen
- Automatically prevents duplicates in the result

## Running this exercise

From the **root** of the monorepo:
```bash
npm start -w @code-playground/ts-find-duplicates
```

Or navigate to this directory:
```bash
cd exercises/typescript/find-duplicates
npm start
```

## What you'll practice

- Using Set for efficient lookups
- Tracking seen elements
- Array iteration patterns

