/*
  Objetivo: Aplicar el principio de inversión de dependencias (DIP).
*/

/* Codigo base (BAD - violates DIP):
class Logger {
    log(msg: string) {
        console.log(msg);
    }
}

export class UserService {
    private logger = new Logger();  // Direct dependency!
    createUser(name: string) {
        this.logger.log(`User ${name} created`);
    }
}

const userService = new UserService();
userService.createUser("Alice");
*/

// GOOD - Follows DIP: Depend on abstractions, not concretions

interface LoggerInterface {
    log: (msg: string) => void;
}

class ConsoleLogger implements LoggerInterface {
    log(msg: string) {
        console.log(`[ConsoleLogger] ${msg}`);
    }
}

class FileLogger implements LoggerInterface {
    log(msg: string) {
        console.log(`[FileLogger] Would write to file: ${msg}`);
    }
}

export class UserService {
    private logger: LoggerInterface;

    constructor(logger: LoggerInterface) {
        this.logger = logger;
    }

    createUser(name: string) {
        this.logger.log(`User ${name} created`);
    }
}

function main() {
    console.log("=== Dependency Inversion Principle ===\n");

    // We can now easily swap logger implementations
    const consoleLogger = new ConsoleLogger();
    const fileLogger = new FileLogger();

    const userService1 = new UserService(consoleLogger);
    userService1.createUser("Alice");

    const userService2 = new UserService(fileLogger);
    userService2.createUser("Bob");

    console.log("\n✅ DIP applied successfully!");
}

main();

