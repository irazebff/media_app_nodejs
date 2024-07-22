-- Adicione valores padrão para colunas nulas
UPDATE "Item" SET "genero" = 'Unknown' WHERE "genero" IS NULL;
UPDATE "Item" SET "isTrack" = false WHERE "isTrack" IS NULL;

-- Alterar as colunas para NOT NULL
ALTER TABLE "Item" ALTER COLUMN "genero" SET NOT NULL;
ALTER TABLE "Item" ALTER COLUMN "isTrack" SET NOT NULL;

-- Criação de tabelas e colunas adicionais conforme gerado pelo Prisma
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id")
);

CREATE TABLE "UserPermission" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("permissionId") REFERENCES "Permission"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Criação dos índices e chaves únicas
CREATE UNIQUE INDEX "Permission_name_key" ON "Permission"("name");
CREATE UNIQUE INDEX "UserPermission_userId_permissionId_key" ON "UserPermission"("userId", "permissionId");
