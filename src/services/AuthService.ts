import bcrypt from 'bcrypt'; // Usando bcrypt, não bcryptjs
import jwt from 'jsonwebtoken';
import { PrismaClient, User, Role } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export class AuthService {
  // Registra um novo usuário com verificação de existência e hash de senha
  async register(email: string, password: string, role: string): Promise<User> {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Converte a string role para o enum Role
    const roleEnum = Role[role.toUpperCase() as keyof typeof Role];

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: roleEnum,
      },
    });

    return user;
  }

  // Autentica um usuário e retorna um token JWT
  async login(email: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return token;
  }

  // Retorna todos os usuários registrados no sistema
  async getAllUsers(): Promise<User[]> {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        // Não incluir 'password' para segurança
      }
    });
  }
}
