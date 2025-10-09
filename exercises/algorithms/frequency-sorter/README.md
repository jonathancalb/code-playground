# Frequency Sorter

Sort an array by the frequency of its elements, with ties broken by value.

## Problem

Given an array of integers, sort in **decreasing order of frequency**. If two elements have the same frequency, the smaller value comes first.

## Example

**Input:** `[4, 5, 6, 5, 4, 3]`

**Frequencies:**
- 4 → 2 times
- 5 → 2 times  
- 3 → 1 time
- 6 → 1 time

**Output:** `[4, 4, 5, 5, 3, 6]`

## Running this exercise

From the **root** of the monorepo:
```bash
pnpm --filter @code-playground/ts-frequency-sorter start
```

Or navigate to this directory:
```bash
cd exercises/typescript/frequency-sorter
pnpm start
```

## What you'll practice

- Using `Map` for frequency counting
- Sorting with custom comparators
- Algorithm optimization

