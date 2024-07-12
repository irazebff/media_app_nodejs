import { Request, Response } from 'express';
import * as wordpressService from '../services/wordpressService';

export async function getPosts(req: Request, res: Response) {
  try {
    const posts = await wordpressService.getPosts();
    res.json(posts);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Erro ao buscar posts' });
    }
  }
}
