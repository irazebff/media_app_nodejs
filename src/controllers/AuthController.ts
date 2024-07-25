import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { Prisma } from '@prisma/client';

const authService = new AuthService();

export class AuthController {
  async register(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password, role } = request.body;
      const user = await authService.register(email, password, role);
      return response.status(201).json(user);
    } catch (error) {
      console.error('Registration error:', error);
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return response.status(400).json({ message: 'Email already exists' });
        }
      }
      return response.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, password } = request.body;
      const token = await authService.login(email, password);
      return response.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof Error && error.message === 'Invalid email or password') {
        return response.status(400).json({ message: 'Invalid email or password' });
      }
      return response.status(500).json({ message: 'Internal server error', error: error.message });
    }
  }

  async getAllUsers(request: Request, response: Response): Promise<Response> {
    try {
      const users = await authService.getAllUsers();
      return response.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
}

