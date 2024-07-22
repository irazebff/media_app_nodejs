import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export class AuthService {
  async register(email: string, password: string, role: 'admin' | 'client'): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const permissions = role === 'admin' ? ['ADMIN'] : ['CLIENT'];
    await Promise.all(
      permissions.map(async (permission) => {
        const perm = await prisma.permission.upsert({
          where: { name: permission },
          update: {},
          create: {
            name: permission,
            description: `${permission} permission`,
          },
        });

        await prisma.userPermission.create({
          data: {
            userId: user.id,
            permissionId: perm.id,
          },
        });
      })
    );

    return user;
  }

  async login(email: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });

    return token;
  }

  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany();
  }
}
