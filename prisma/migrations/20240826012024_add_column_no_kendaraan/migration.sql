/*
  Warnings:

  - Added the required column `no_kendaraaan` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` ADD COLUMN `no_kendaraaan` VARCHAR(191) NOT NULL;
