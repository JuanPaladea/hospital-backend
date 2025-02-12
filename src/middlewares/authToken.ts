import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env";

const authToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send({ status: "error", message: "No token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as {
      id: string;
      username: string;
      email: string;
      role: string;
    };
    next();
    return;
  } catch (error) {
    res.status(403).send({ status: "error", message: "Unauthorized" });
    return;
  }
};

export default authToken;
