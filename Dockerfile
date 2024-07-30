# Use a imagem base do Node.js
FROM node:18

# Instale as dependências necessárias para compilar pacotes nativos
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Defina o diretório de trabalho no container
WORKDIR /usr/src/app

# Copie o package.json e package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código da aplicação para o diretório de trabalho
COPY . .

# Recompile as dependências nativas para garantir compatibilidade com a arquitetura do container
RUN npm rebuild bcrypt --build-from-source

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && npm run dev"]
