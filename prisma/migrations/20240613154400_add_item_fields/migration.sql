/*
  Warnings:

  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - Added the required column `album` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artist` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverURL` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" DROP COLUMN "name",
ADD COLUMN     "album" TEXT NOT NULL,
ADD COLUMN     "artist" TEXT NOT NULL,
ADD COLUMN     "coverURL" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
