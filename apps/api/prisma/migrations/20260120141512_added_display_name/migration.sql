/*
  Warnings:

  - A unique constraint covering the columns `[displayname]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `displayname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "displayname" TEXT NOT NULL,
ALTER COLUMN "firstname" DROP NOT NULL,
ALTER COLUMN "lastname" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_displayname_key" ON "User"("displayname");
