import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import SQLiteService from "../services/SQLiteService";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  /**
   * Initialize database and check for stored user session
   */
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      setLoading(true);

      // Initialize SQLite database
      await SQLiteService.initDatabase();

      // Check if user is already logged in
      const storedUserId = await AsyncStorage.getItem("userId");

      if (storedUserId) {
        const userData = await SQLiteService.getUserById(
          parseInt(storedUserId)
        );

        if (userData) {
          setUser(userData);
          setIsAuthenticated(true);
          console.log("✅ User session restored:", userData.email);
        } else {
          // User not found in database, clear storage
          await AsyncStorage.removeItem("userId");
        }
      }
    } catch (error) {
      console.error("❌ Error initializing auth:", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * User signup
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} - Result with success status and message
   */
  const signup = async (userData) => {
    try {
      const { name, email, password } = userData;

      // Hash password using expo-crypto
      const hashedPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      // Create user in database
      const userId = await SQLiteService.createUser(
        name,
        email,
        hashedPassword
      );

      // Fetch the created user
      const newUser = await SQLiteService.getUserById(userId);

      // Store user ID in AsyncStorage
      await AsyncStorage.setItem("userId", userId.toString());

      // Update state
      setUser(newUser);
      setIsAuthenticated(true);

      console.log("✅ Signup successful:", email);

      return {
        success: true,
        message: "Account created successfully!",
        user: newUser,
      };
    } catch (error) {
      console.error("❌ Signup error:", error);

      return {
        success: false,
        message: error.message || "Signup failed. Please try again.",
      };
    }
  };

  /**
   * User login
   * @param {Object} credentials - Login credentials
   * @returns {Promise<Object>} - Result with success status and message
   */
  const login = async (credentials) => {
    try {
      const { email, password } = credentials;

      // Get user from database
      const userData = await SQLiteService.getUserByEmail(email);

      if (!userData) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // Verify password - hash the input password and compare
      const hashedInputPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      if (hashedInputPassword !== userData.password) {
        return {
          success: false,
          message: "Invalid email or password",
        };
      }

      // Store user ID in AsyncStorage
      await AsyncStorage.setItem("userId", userData.id.toString());

      // Remove password from user object
      const { password: _, ...userWithoutPassword } = userData;

      // Update state
      setUser(userWithoutPassword);
      setIsAuthenticated(true);

      console.log("✅ Login successful:", email);

      return {
        success: true,
        message: "Login successful!",
        user: userWithoutPassword,
      };
    } catch (error) {
      console.error("❌ Login error:", error);

      return {
        success: false,
        message: "Login failed. Please try again.",
      };
    }
  };

  /**
   * User logout
   */
  const logout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem("userId");

      // Update state
      setUser(null);
      setIsAuthenticated(false);

      console.log("✅ Logout successful");

      return {
        success: true,
        message: "Logged out successfully",
      };
    } catch (error) {
      console.error("❌ Logout error:", error);

      return {
        success: false,
        message: "Logout failed",
      };
    }
  };

  /**
   * Update user profile
   * @param {Object} updates - Fields to update
   */
  const updateUserProfile = async (updates) => {
    try {
      if (!user) {
        throw new Error("No user logged in");
      }

      await SQLiteService.updateUser(user.id, updates);

      const updatedUser = await SQLiteService.getUserById(user.id);
      setUser(updatedUser);

      return {
        success: true,
        message: "Profile updated successfully",
      };
    } catch (error) {
      console.error("❌ Update profile error:", error);

      return {
        success: false,
        message: error.message || "Failed to update profile",
      };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    signup,
    login,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use the AuthContext
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export default AuthContext;
