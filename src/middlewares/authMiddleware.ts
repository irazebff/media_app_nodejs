import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export function authMiddleware(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).json({ message: 'Token not provided' });
    return;
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    request.userId = decoded.id;
    next();
  } catch (err) {
    response.status(401).json({ message: 'Token invalid' });
  }
}
