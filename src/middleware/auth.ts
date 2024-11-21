import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401);
      throw new Error('Authentication required');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401);
    next(error);
  }
};

export const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user || req.user.role !== 'admin') {
      res.status(403);
      throw new Error('Admin access required');
    }
    next();
  } catch (error) {
    next(error);
  }
};