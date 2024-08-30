-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_dock_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_slot_id_fkey`;

-- AlterTable
ALTER TABLE `transactions` MODIFY `dock_id` CHAR(100) NULL,
    MODIFY `slot_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_slot_id_fkey` FOREIGN KEY (`slot_id`) REFERENCES `Slot`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_dock_id_fkey` FOREIGN KEY (`dock_id`) REFERENCES `docks`(`dock_id`) ON DELETE SET NULL ON UPDATE CASCADE;
