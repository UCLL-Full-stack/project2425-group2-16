/*
  Warnings:

  - Made the column `genre` on table `Game` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Game" ALTER COLUMN "genre" SET NOT NULL,
ALTER COLUMN "genre" SET DATA TYPE TEXT;
