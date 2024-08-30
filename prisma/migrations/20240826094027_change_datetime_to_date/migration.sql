/*
  Warnings:

  - You are about to drop the `Slot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_slot_id_fkey`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `booking_date` DATE NULL;

-- DropTable
DROP TABLE `Slot`;

-- CreateTable
CREATE TABLE `slots` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_slot_id_fkey` FOREIGN KEY (`slot_id`) REFERENCES `slots`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
