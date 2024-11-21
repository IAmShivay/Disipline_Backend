import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import axios from "axios";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res.status(401);
      throw new Error("Authentication required");
    }
    const verifyResponse = await axios.get(
      "http://localhost:4000/api/auth/verify",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    req.user = verifyResponse.data;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ error: "Authentication failed" });
  }
};

export const requireAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403);
      throw new Error("Admin access required");
    }
    next();
  } catch (error) {
    next(error);
  }
};
