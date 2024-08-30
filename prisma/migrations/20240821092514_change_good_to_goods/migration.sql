/*
  Warnings:

  - You are about to drop the column `good_type_id` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `goods_type_id` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `transactions_good_type_id_fkey`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `good_type_id`,
    ADD COLUMN `goods_type_id` CHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_goods_type_id_fkey` FOREIGN KEY (`goods_type_id`) REFERENCES `goods_types`(`goods_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
