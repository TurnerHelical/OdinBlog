-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hasRequested" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "postRequest" TEXT;
