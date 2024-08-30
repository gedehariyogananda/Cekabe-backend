/*
  Warnings:

  - You are about to drop the column `gate_in_time` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `gate_out_time` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `in_progress_time` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `loaded_unloaded_time` on the `transactions` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_location_id_fkey`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `gate_in_time`,
    DROP COLUMN `gate_out_time`,
    DROP COLUMN `in_progress_time`,
    DROP COLUMN `loaded_unloaded_time`,
    MODIFY `process_start` TIME NULL,
    MODIFY `process_finish` TIME NULL;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `locations`(`location_id`) ON DELETE SET NULL ON UPDATE RESTRICT;
