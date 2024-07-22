import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const checkPermission = (requiredPermissions: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("No token provided");
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

      console.log("User permissions:", userPermissions);
      console.log("Required permissions:", requiredPermissions);

      // Verificar se o usuário tem pelo menos uma das permissões requeridas
    //   const hasPermission = userPermissions.some(userPermission =>
    //     requiredPermissions.includes(userPermission.permission.name)
    //   );

    //   console.log("Has permission:", hasPermission);

    //   if (!hasPermission) {
    //     return res.status(403).json({ message: 'Permission denied' });
    //   }

      req.userId = userId;
      next();
    } catch (error) {
      console.log("Failed to authenticate token:", error);
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }
  };
};
