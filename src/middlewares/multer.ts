import multer from 'multer';
import path from 'path';

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname}`;
    callback(null, filename);
  },
});

// Função para validar se o arquivo é uma imagem ou áudio
const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Verifica se o mimetype começa com 'image/' ou 'audio/'
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('audio/')) {
    cb(null, true); // Aceita o arquivo
  } else {
    cb(new Error('Formato de arquivo não suportado: Apenas imagens e áudios são permitidos'), false); // Rejeita o arquivo
  }
};

// Criação do middleware de upload com a configuração de storage e fileFilter
const upload = multer({ 
  storage,
  fileFilter,
});

export default upload;
