-- CreateTable
CREATE TABLE "FavoritesListGame" (
    "favoritesListId" INTEGER NOT NULL,
    "gameId" INTEGER NOT NULL,

    CONSTRAINT "FavoritesListGame_pkey" PRIMARY KEY ("favoritesListId","gameId")
);

-- AddForeignKey
ALTER TABLE "FavoritesListGame" ADD CONSTRAINT "FavoritesListGame_favoritesListId_fkey" FOREIGN KEY ("favoritesListId") REFERENCES "FavoritesList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoritesListGame" ADD CONSTRAINT "FavoritesListGame_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
