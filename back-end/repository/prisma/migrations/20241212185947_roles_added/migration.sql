-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('Standard', 'Moderator');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole";
