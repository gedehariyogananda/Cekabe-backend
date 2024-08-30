/*
  Warnings:

  - Added the required column `driver` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` ADD COLUMN `driver` VARCHAR(191) NOT NULL;
