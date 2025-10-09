# Array Sort Practice

Practice using `Array.prototype.sort()` with custom comparator functions.

## Problem

Given an array of product objects, implement functions to sort by:
- **Price** (ascending)
- **Rating** (descending)
- **Name** (alphabetically, case-insensitive)

**Important:** Do not mutate the original array!

## Running this exercise

From the **root** of the monorepo:
```bash
pnpm --filter @code-playground/ts-array-sort start
```

Or navigate to this directory:
```bash
cd exercises/typescript/array-sort
pnpm start
```

## What you'll practice

- Array spread operator for immutability
- Custom sort comparators
- `localeCompare` for string sorting
- Using `console.table` for better output

## Key Concepts

```typescript
// Numbers: ascending
arr.sort((a, b) => a - b)

// Numbers: descending  
arr.sort((a, b) => b - a)

// Strings: alphabetically
arr.sort((a, b) => a.localeCompare(b))
```

