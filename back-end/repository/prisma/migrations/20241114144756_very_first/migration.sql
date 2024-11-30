-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "supportedLanguages" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "systemRequirements" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "multiplayer" BOOLEAN NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);
