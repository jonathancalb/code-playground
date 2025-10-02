import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'your-secret-key-change-in-production';
const SALT_ROUNDS = 10;

// User interface
interface User {
  id: number;
  username: string;
  passwordHash: string;
}

// In-memory user database (use a real database in production)
const users: User[] = [];
let nextUserId = 1;

// Hash a password
async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Verify a password against a hash
async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Register a new user
async function register(username: string, password: string): Promise<User> {
  // Check if user already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    throw new Error('Username already exists');
  }

  // Hash the password
  const passwordHash = await hashPassword(password);

  // Create user
  const user: User = {
    id: nextUserId++,
    username,
    passwordHash
  };

  users.push(user);
  console.log(`✅ User registered: ${username}`);
  
  return user;
}

// Login and generate JWT token
async function login(username: string, password: string): Promise<string> {
  // Find user
  const user = users.find(u => u.username === username);
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  console.log(`✅ User logged in: ${username}`);
  return token;
}

// Verify JWT token
function verifyToken(token: string): { userId: number; username: string } {
  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { userId: number; username: string };
    return decoded;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}

// Main demo
async function main() {
  console.log("=== Authentication Exercise ===\n");

  try {
    // Register users
    console.log("📝 Registering users...");
    await register('alice', 'password123');
    await register('bob', 'securepass456');
    console.log();

    // Try to register duplicate user
    console.log("❌ Trying to register duplicate user...");
    try {
      await register('alice', 'anotherpassword');
    } catch (error) {
      console.log(`Error: ${(error as Error).message}`);
    }
    console.log();

    // Login
    console.log("🔐 Logging in...");
    const token = await login('alice', 'password123');
    console.log(`Token: ${token.substring(0, 20)}...`);
    console.log();

    // Verify token
    console.log("✔️  Verifying token...");
    const decoded = verifyToken(token);
    console.log(`Decoded token:`, decoded);
    console.log();

    // Try invalid login
    console.log("❌ Trying invalid login...");
    try {
      await login('alice', 'wrongpassword');
    } catch (error) {
      console.log(`Error: ${(error as Error).message}`);
    }
    console.log();

    console.log("✅ All tests passed!");
  } catch (error) {
    console.error("Error:", error);
  }
}

main();

