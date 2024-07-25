import { Request, Response } from 'express';
import * as purchaseService from '../services/purchaseService';

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;
    const userId = req.userId; // Assumindo que o middleware de autenticação adiciona userId ao objeto req
    const purchase = await purchaseService.createPurchase(userId, itemId);
    res.status(201).json(purchase);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getPurchasesByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // Assumindo que o middleware de autenticação adiciona userId ao objeto req
    const purchases = await purchaseService.getPurchasesByUser(userId);
    res.json(purchases);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
