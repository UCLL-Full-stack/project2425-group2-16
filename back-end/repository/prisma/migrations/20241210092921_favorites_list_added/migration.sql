-- CreateTable
CREATE TABLE "FavoritesList" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "privacySettings" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,

    CONSTRAINT "FavoritesList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FavoritesList_userId_key" ON "FavoritesList"("userId");

-- AddForeignKey
ALTER TABLE "FavoritesList" ADD CONSTRAINT "FavoritesList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
