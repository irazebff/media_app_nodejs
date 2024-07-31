import { Request, Response } from 'express';
import * as itemService from '../services/itemService';

export const getItems = async (_req: Request, res: Response) => {
  try {
    const items = await itemService.getItems();
    console.log('Retrieved items:', items);
    res.json(items);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const item = await itemService.getItem(itemId);
    if (!item) {
      console.log(`Item not found: ${itemId}`);
      return res.status(404).json({ message: 'Item not found' });
    }
    console.log('Retrieved item:', item);
    res.json(item);
  } catch (error) {
    console.error('Error retrieving item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const { title, artist, album, coverURL, description, isTrack, genero } = req.body;
    const image = req.files?.['image']?.[0];
    const audio = req.files?.['audio']?.[0];

    const newItem = await itemService.createItem({
      title,
      artist,
      album,
      coverURL,
      description,
      imageUrl: image ? `/uploads/${image.filename}` : '',
      audioUrl: audio ? `/uploads/${audio.filename}` : '',
      isTrack,
      genero,
    });
    console.log('Created item:', newItem);
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const { title, artist, album, coverURL, description, isTrack, genero } = req.body;
    const image = req.files?.['image']?.[0];
    const audio = req.files?.['audio']?.[0];

    const updatedItem = await itemService.updateItem(itemId, {
      title,
      artist,
      album,
      coverURL,
      description,
      imageUrl: image ? `/uploads/${image.filename}` : undefined,
      audioUrl: audio ? `/uploads/${audio.filename}` : undefined,
      isTrack,
      genero,
    });
    if (!updatedItem) {
      console.log(`Item not found for update: ${itemId}`);
      return res.status(404).json({ message: 'Item not found' });
    }
    console.log('Updated item:', updatedItem);
    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    await itemService.deleteItem(itemId);
    console.log(`Deleted item: ${itemId}`);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
