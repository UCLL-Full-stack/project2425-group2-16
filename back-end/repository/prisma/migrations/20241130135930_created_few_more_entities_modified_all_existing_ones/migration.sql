/*
  Warnings:

  - Added the required column `genre` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisherId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Game` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "genre" VARCHAR,
ADD COLUMN     "publisherId" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "birthDate" TIMESTAMP(3) NOT NULL,
    "password" TEXT NOT NULL,
    "accountCreationDate" TIMESTAMP(3) NOT NULL,
    "timeZone" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "contactInformation" TEXT NOT NULL,
    "overallRating" INTEGER NOT NULL,
    "dateOfFirstPublishing" TIMESTAMP(3) NOT NULL,
    "country" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,
    "dateOfPurchase" TIMESTAMP(3) NOT NULL,
    "currency" TEXT NOT NULL,
    "amountPayed" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_gameId_key" ON "Purchase"("userId", "gameId");

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
