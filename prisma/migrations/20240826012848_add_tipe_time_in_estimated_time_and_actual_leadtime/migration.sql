/*
  Warnings:

  - You are about to drop the `history` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_goods_type_id_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `history` DROP FOREIGN KEY `history_vehicle_type_id_fkey`;

-- DropTable
DROP TABLE `history`;

-- CreateTable
CREATE TABLE `histories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_no` VARCHAR(191) NOT NULL,
    `activity` ENUM('Loading', 'Unloading') NOT NULL,
    `no_kendaraan` VARCHAR(191) NOT NULL,
    `ref_doc_type` VARCHAR(191) NOT NULL,
    `ref_doc_no` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `driver` VARCHAR(191) NOT NULL,
    `vehicle_type_id` VARCHAR(191) NOT NULL,
    `goods_type_id` VARCHAR(191) NOT NULL,
    `weight_gate_in` VARCHAR(191) NOT NULL,
    `weight_gate_out` VARCHAR(191) NOT NULL,
    `gate_in` DATETIME(3) NOT NULL,
    `loading_unloading_start` DATETIME(3) NOT NULL,
    `loading_unloading_end` DATETIME(3) NOT NULL,
    `estimated_leadtime` TIME NOT NULL,
    `actual_leadtime` TIME NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `gate_out` DATETIME(3) NOT NULL,
    `lead_time_gate_in_out` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `histories` ADD CONSTRAINT `histories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histories` ADD CONSTRAINT `histories_vehicle_type_id_fkey` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types`(`vehicle_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histories` ADD CONSTRAINT `histories_goods_type_id_fkey` FOREIGN KEY (`goods_type_id`) REFERENCES `goods_types`(`goods_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `histories` ADD CONSTRAINT `histories_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
