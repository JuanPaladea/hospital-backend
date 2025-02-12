import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import SessionService from "../services/sessionService";
import { Request, Response } from "express";
import { JWT_SECRET } from "../config/env";

const createAndSetToken = (user: any, res: Response): void => {
  const token = jwt.sign(
    {
      id: user.user_id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000, // 1 hour
  });
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ status: "error", message: "Unauthorized" });
      return;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      username: string;
      email: string;
      role: string;
    };
    res.status(200).json({ status: "success", user: decoded });
  } catch (error: any) {
    console.error("Error in getMe:", error);
    res.status(401).json({ status: "error", message: "Invalid token" });
  }
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { username, email, password, password2 } = req.body;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ status: "error", message: "Invalid email" });
    return;
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    res.status(400).json({
      status: "error",
      message:
        "Password must contain at least 8 characters, one letter, and one number",
    });
    return;
  }

  if (password !== password2) {
    res
      .status(400)
      .json({ status: "error", message: "Passwords do not match" });
    return;
  }

  try {
    const existingUser = await SessionService.getUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ status: "error", message: "User already exists" });
      return;
    }
  } catch (error: any) {
    console.error("Error checking existing user:", error);
    res.status(500).json({ status: "error", message: error.message });
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await SessionService.registerUser(
      username,
      email,
      hashedPassword
    );
    createAndSetToken(user, res);
    res
      .status(201)
      .json({ status: "success", message: "User created successfully" });
  } catch (error: any) {
    console.error("Error registering user:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ status: "error", message: "Invalid email" });
    return;
  }

  try {
    const user = await SessionService.getUserByEmail(email);
    if (!user) {
      res.status(400).json({ status: "error", message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ status: "error", message: "Invalid password" });
      return;
    }

    createAndSetToken(user, res);
    res
      .status(200)
      .json({ status: "success", message: "User logged in successfully" });
  } catch (error: any) {
    console.error("Error during login:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const result = await SessionService.deleteUser(userId);
    if (result.rowCount === 0) {
      res.status(404).json({ status: "error", message: "User not found" });
      return;
    }
    res
      .status(200)
      .json({ status: "success", message: "User deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting user:", error);
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const logOut = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie("token");
  res
    .status(200)
    .json({ status: "success", message: "User logged out successfully" });
};
