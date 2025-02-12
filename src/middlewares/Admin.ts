import { Request, Response, NextFunction } from "express";

const Admin = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ status: "error", message: "Unauthorized" });
    return;
  }
  next();
};

export default Admin;
