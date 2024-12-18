/*
  Warnings:

  - A unique constraint covering the columns `[name,website]` on the table `Publisher` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Publisher_name_website_key" ON "Publisher"("name", "website");
