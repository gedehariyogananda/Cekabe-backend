/*
  Warnings:

  - You are about to drop the column `no_kendaraaan` on the `history` table. All the data in the column will be lost.
  - Added the required column `no_kendaraan` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `history` DROP COLUMN `no_kendaraaan`,
    ADD COLUMN `no_kendaraan` VARCHAR(191) NOT NULL;
