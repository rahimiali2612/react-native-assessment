import * as SQLite from "expo-sqlite";

class SQLiteService {
  constructor() {
    this.db = null;
  }

  /**
   * Initialize the database and create tables
   */
  async initDatabase() {
    try {
      this.db = await SQLite.openDatabaseAsync("UserAuth.db");

      await this.createTables();
      console.log("✅ Database initialized successfully");
      return true;
    } catch (error) {
      console.error("❌ Database initialization failed:", error);
      throw error;
    }
  }

  /**
   * Create the users table
   */
  async createTables() {
    const createUserTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    try {
      await this.db.execAsync(createUserTable);
      console.log("✅ Users table created successfully");
    } catch (error) {
      console.error("❌ Error creating tables:", error);
      throw error;
    }
  }

  /**
   * Create a new user
   * @param {string} name - User's name
   * @param {string} email - User's email
   * @param {string} hashedPassword - Hashed password
   * @returns {Promise<number>} - User ID
   */
  async createUser(name, email, hashedPassword) {
    try {
      const result = await this.db.runAsync(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword]
      );

      const userId = result.lastInsertRowId;
      console.log(`✅ User created successfully with ID: ${userId}`);
      return userId;
    } catch (error) {
      if (error.message.includes("UNIQUE constraint failed")) {
        throw new Error("Email already exists");
      }
      console.error("❌ Error creating user:", error);
      throw error;
    }
  }

  /**
   * Get user by email
   * @param {string} email - User's email
   * @returns {Promise<Object|null>} - User object or null
   */
  async getUserByEmail(email) {
    try {
      const result = await this.db.getFirstAsync(
        "SELECT * FROM users WHERE email = ?",
        [email]
      );

      if (result) {
        console.log(`✅ User found: ${result.email}`);
        return result;
      }

      console.log("⚠️ User not found");
      return null;
    } catch (error) {
      console.error("❌ Error fetching user:", error);
      throw error;
    }
  }

  /**
   * Get user by ID
   * @param {number} userId - User's ID
   * @returns {Promise<Object|null>} - User object or null
   */
  async getUserById(userId) {
    try {
      const result = await this.db.getFirstAsync(
        "SELECT id, name, email, created_at FROM users WHERE id = ?",
        [userId]
      );

      return result || null;
    } catch (error) {
      console.error("❌ Error fetching user by ID:", error);
      throw error;
    }
  }

  /**
   * Update user information
   * @param {number} userId - User's ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<boolean>} - Success status
   */
  async updateUser(userId, updates) {
    try {
      const { name, email } = updates;
      await this.db.runAsync(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [name, email, userId]
      );

      console.log("✅ User updated successfully");
      return true;
    } catch (error) {
      console.error("❌ Error updating user:", error);
      throw error;
    }
  }

  /**
   * Delete user
   * @param {number} userId - User's ID
   * @returns {Promise<boolean>} - Success status
   */
  async deleteUser(userId) {
    try {
      await this.db.runAsync("DELETE FROM users WHERE id = ?", [userId]);
      console.log("✅ User deleted successfully");
      return true;
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      throw error;
    }
  }

  /**
   * Get all users (for testing purposes)
   * @returns {Promise<Array>} - Array of users
   */
  async getAllUsers() {
    try {
      const users = await this.db.getAllAsync(
        "SELECT id, name, email, created_at FROM users"
      );

      return users || [];
    } catch (error) {
      console.error("❌ Error fetching all users:", error);
      throw error;
    }
  }

  /**
   * Close database connection
   */
  async closeDatabase() {
    if (this.db) {
      await this.db.closeAsync();
      console.log("✅ Database closed");
    }
  }

  /**
   * Drop all tables (for testing/reset purposes)
   */
  async dropAllTables() {
    try {
      await this.db.execAsync("DROP TABLE IF EXISTS users");
      console.log("✅ All tables dropped");
      await this.createTables();
    } catch (error) {
      console.error("❌ Error dropping tables:", error);
      throw error;
    }
  }
}

export default new SQLiteService();
