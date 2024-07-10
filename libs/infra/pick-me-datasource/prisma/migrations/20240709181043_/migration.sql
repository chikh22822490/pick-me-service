/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `availableSeats` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Ride` table without a default value. This is not possible if the table is not empty.
  - Added the required column `whatsapp` to the `Ride` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_userId_fkey";

-- AlterTable
ALTER TABLE "Ride" ADD COLUMN     "availableSeats" INTEGER NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "whatsapp" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";
