import multer from 'multer';
import path from 'path';
import express from 'express';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {

  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/')) {
    cb(null, true); 
  } else {
    cb(new Error('Formato de arquivo não suportado: Apenas imagens e áudios são permitidos') as any, false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
});

export default upload;
