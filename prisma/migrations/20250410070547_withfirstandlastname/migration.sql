/*
  Warnings:

  - You are about to drop the column `username` on the `Call` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `rfid` to the `Call` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_username_fkey";

-- AlterTable
ALTER TABLE "Call" DROP COLUMN "username",
ADD COLUMN     "rfid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "name",
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("rfid");

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_rfid_fkey" FOREIGN KEY ("rfid") REFERENCES "User"("rfid") ON DELETE RESTRICT ON UPDATE CASCADE;
