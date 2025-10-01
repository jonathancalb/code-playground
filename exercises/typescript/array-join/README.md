# Array Join Challenge

Implement a SQL-like JOIN operation for two arrays of objects.

## Problem

Create a function that merges two arrays based on a matching key, similar to a database JOIN.

**Function Signature:**
```typescript
function joinArrays(
  leftArray: Array<object>,
  rightArray: Array<object>,
  key: string
): Array<object>
```

## Example

**Input:**
- `directory`: Array of user records with phone numbers
- `registrations`: Array of user records with emails
- Join by `"name"` field

**Output:**
Merged array with both phone and email for matching users.

## Requirements

1. **Performance:** Use Map for O(n) instead of nested loops O(n²)
2. **Merging:** Combine all properties from both records
3. **Design decision:** How do you handle records that only exist in one array?

## Running this exercise

From the **root** of the monorepo:
```bash
npm start -w @code-playground/ts-array-join
```

Or navigate to this directory:
```bash
cd exercises/typescript/array-join
npm start
```

## What you'll practice

- Using Map for efficient lookups
- Object spreading and merging
- Algorithm optimization
- Data transformation patterns

## Challenge

This exercise is intentionally left incomplete - implement the solution yourself!

