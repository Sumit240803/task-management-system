import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ message: "Unauthorized" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_SECRET!
    );
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};