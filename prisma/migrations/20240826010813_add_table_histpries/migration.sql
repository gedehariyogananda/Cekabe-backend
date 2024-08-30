-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `gate_in_time` DATETIME(3) NULL,
    ADD COLUMN `gate_out_time` DATETIME(3) NULL,
    ADD COLUMN `in_progress_time` DATETIME(3) NULL,
    ADD COLUMN `loaded_unloaded_time` DATETIME(3) NULL,
    ADD COLUMN `user_id` CHAR(100) NULL;

-- CreateTable
CREATE TABLE `history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_no` VARCHAR(191) NOT NULL,
    `activity` ENUM('Loading', 'Unloading') NOT NULL,
    `ref_doc_type` VARCHAR(191) NOT NULL,
    `ref_doc_no` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `vehicle_type_id` VARCHAR(191) NOT NULL,
    `goods_type_id` VARCHAR(191) NOT NULL,
    `weight_gate_in` VARCHAR(191) NOT NULL,
    `weight_gate_out` VARCHAR(191) NOT NULL,
    `gate_in` DATETIME(3) NOT NULL,
    `loading_unloading_start` DATETIME(3) NOT NULL,
    `loading_unloading_end` DATETIME(3) NOT NULL,
    `estimated_leadtime` DATETIME(3) NOT NULL,
    `actual_leadtime` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `gate_out` DATETIME(3) NOT NULL,
    `lead_time_gate_in_out` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_vehicle_type_id_fkey` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types`(`vehicle_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_goods_type_id_fkey` FOREIGN KEY (`goods_type_id`) REFERENCES `goods_types`(`goods_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
