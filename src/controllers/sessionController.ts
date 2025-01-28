import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import SessionService from '../services/sessionService';
import { Request, Response } from "express";
import { JWT_SECRET } from '../config/env';

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).send({status: 'error', message: 'Invalid email'});
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    res.status(400).send({status: 'error', message: 'Password must contain at least 8 characters, one letter and one number'});
  }

  try {
    const user = await SessionService.getUserByEmail(email);
    if (user) {
      res.status(400).send({status: 'error', message: 'User already exists'});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", message: (error as any).message });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await SessionService.registeUser(username, email, hashedPassword);
    const token = jwt.sign({id: user.user_id}, JWT_SECRET, {expiresIn: '1h'});

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(201).send({status: 'success', message: 'User created successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", message: (error as any).message });
  }
}

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).send({status: 'error', message: 'Invalid email'});
  }

  try {
    const user = await SessionService.getUserByEmail(email);
    if (!user) {
      res.status(400).send({status: 'error', message: 'User not found'});
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).send({status: 'error', message: 'Invalid password'});
    }

    const token = jwt.sign({id: user.user_id}, JWT_SECRET, {expiresIn: '1h'});
    
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).send({status: 'success', message: 'User logged in successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", message: (error as any).message });
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.userId;

  try {
    const result = await SessionService.deleteUser(userId);
    if (result.rowCount === 0) {
      res.status(404).send({status: 'error', message: 'User not found'});
    }
    res.status(200).send({status: 'success', message: 'User deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", message: (error as any).message });
  }
} 

export const logOut = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.status(200).send({status: 'success', message: 'User logged out successfully'});
}