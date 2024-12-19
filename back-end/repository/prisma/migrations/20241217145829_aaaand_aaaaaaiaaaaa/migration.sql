/*
  Warnings:

  - A unique constraint covering the columns `[publisherId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "publisherId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_publisherId_key" ON "User"("publisherId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE SET NULL ON UPDATE CASCADE;
