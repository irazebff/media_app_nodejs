import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const checkPermission = (requiredPermission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(403).json({ message: 'No token provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
      const userId = decoded.id;

      // Obter permissões do usuário
      const userPermissions = await prisma.userPermission.findMany({
        where: { userId },
        include: { permission: true },
      });

      // Verificar se o usuário tem a permissão requerida ou é ADMIN
      const hasPermission = userPermissions.some(
        (userPermission) =>
          userPermission.permission.name === requiredPermission || userPermission.permission.name === 'ADMIN'
      );

      if (!hasPermission) {
        return res.status(403).json({ message: 'Permission denied' });
      }

      req.userId = userId;
      next();
    } catch (error) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
  };
};
