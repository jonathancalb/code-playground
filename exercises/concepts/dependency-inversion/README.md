# Dependency Inversion Principle

Practice exercise for the Dependency Inversion Principle (DIP) - one of the SOLID principles.

## Concept

**Bad:** Classes depend on concrete implementations (tight coupling)
**Good:** Classes depend on abstractions/interfaces (loose coupling)

## Running this exercise

From the **root** of the monorepo:
```bash
pnpm --filter @code-playground/ts-dependency-inversion start
```

Or navigate to this directory:
```bash
cd exercises/typescript/dependency-inversion
pnpm start
```

## What you'll learn

- How to use interfaces to decouple dependencies
- The benefits of dependency injection
- Making code more testable and flexible

## Try it yourself

- Add a new logger implementation (e.g., `DatabaseLogger`)
- Swap implementations without changing `UserService`
- Notice how easy it is to test and extend

