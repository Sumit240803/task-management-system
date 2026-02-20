import { NextFunction, Request, Response } from "express";
import { prisma } from "../../prisma/client";
import { hashPassword, comparePassword } from "../../utils/hash";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt";
import { registerSchema, loginSchema } from "./auth.schema";

export const register = async (req : Request, res : Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);

    const existing = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existing)
      return res.status(400).json({
        message: "User already exists",
      });

    const hashed = await hashPassword(data.password);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashed,
      },
    });

    res.status(201).json({ user });
  } catch (err) {
    next(err);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user)
      return res.status(401).json({
        message: "Invalid credentials",
      });

    const valid = await comparePassword(
      data.password,
      user.password
    );

    if (!valid)
      return res.status(401).json({
        message: "Invalid credentials",
      });

    const payload = { id: user.id };

    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    res.json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req: Request, res: Response, _next: NextFunction) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({
      message: "Refresh token required",
    });

  const user = await prisma.user.findFirst({
    where: { refreshToken },
  });

  if (!user)
    return res.status(401).json({
      message: "Invalid refresh token",
    });

  const accessToken = generateAccessToken({
    id: user.id,
  });

  res.json({ accessToken });
};

export const logout = async (req: Request, res: Response, _next: NextFunction) => {
  const { refreshToken } = req.body;

  await prisma.user.updateMany({
    where: { refreshToken },
    data: { refreshToken: null },
  });

  res.json({ message: "Logged out" });
};