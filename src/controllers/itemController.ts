import { Request, Response } from 'express';
import * as itemService from '../services/itemService';

export const getItems = async (req: Request, res: Response) => {
  try {
    const items = await itemService.getItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    const item = await itemService.getItem(itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
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
    res.status(201).json(newItem);
  } catch (error) {
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
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteItem = async (req: Request, res: Response) => {
  try {
    const itemId = req.params.id;
    await itemService.deleteItem(itemId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
