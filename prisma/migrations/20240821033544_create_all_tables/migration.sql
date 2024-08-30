-- CreateTable
CREATE TABLE `booking_schedule_formats` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,
    `format` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `booking_schedule_formats_type_unique`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cache` (
    `key` VARCHAR(255) NOT NULL,
    `value` MEDIUMTEXT NOT NULL,
    `expiration` INTEGER NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cache_locks` (
    `key` VARCHAR(255) NOT NULL,
    `owner` VARCHAR(255) NOT NULL,
    `expiration` INTEGER NOT NULL,

    PRIMARY KEY (`key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customers` (
    `customer_id` CHAR(255) NOT NULL,
    `customer_name` VARCHAR(255) NOT NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',

    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `date_formats` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,
    `format` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `date_formats_type_unique`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `docks` (
    `dock_id` CHAR(255) NOT NULL,
    `dock_name` VARCHAR(255) NOT NULL,
    `location_id` CHAR(255) NOT NULL,
    `max_capacity` INTEGER NOT NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',

    INDEX `docks_location_id_foreign`(`location_id`),
    PRIMARY KEY (`dock_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `failed_jobs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(255) NOT NULL,
    `connection` TEXT NOT NULL,
    `queue` TEXT NOT NULL,
    `payload` LONGTEXT NOT NULL,
    `exception` LONGTEXT NOT NULL,
    `failed_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `failed_jobs_uuid_unique`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gates` (
    `gate_id` CHAR(255) NOT NULL,
    `gate_name` VARCHAR(255) NOT NULL,
    `location_id` CHAR(255) NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',

    INDEX `gates_location_id_foreign`(`location_id`),
    PRIMARY KEY (`gate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `goods_types` (
    `goods_type_id` CHAR(255) NOT NULL,
    `goods_type` VARCHAR(255) NOT NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',

    PRIMARY KEY (`goods_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_batches` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `total_jobs` INTEGER NOT NULL,
    `pending_jobs` INTEGER NOT NULL,
    `failed_jobs` INTEGER NOT NULL,
    `failed_job_ids` LONGTEXT NOT NULL,
    `options` MEDIUMTEXT NULL,
    `cancelled_at` INTEGER NULL,
    `created_at` INTEGER NOT NULL,
    `finished_at` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jobs` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `queue` VARCHAR(255) NOT NULL,
    `payload` LONGTEXT NOT NULL,
    `attempts` TINYINT UNSIGNED NOT NULL,
    `reserved_at` INTEGER UNSIGNED NULL,
    `available_at` INTEGER UNSIGNED NOT NULL,
    `created_at` INTEGER UNSIGNED NOT NULL,

    INDEX `jobs_queue_index`(`queue`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `locations` (
    `location_id` CHAR(255) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `location_type` ENUM('Warehouse', 'In-Plant', 'Crossdock') NOT NULL DEFAULT 'Warehouse',
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',

    PRIMARY KEY (`location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `migrations` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `migration` VARCHAR(255) NOT NULL,
    `batch` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `password_reset_tokens` (
    `email` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permission_role` (
    `permission_id` BIGINT UNSIGNED NOT NULL,
    `role_id` BIGINT UNSIGNED NOT NULL,

    INDEX `permission_role_permission_id_foreign`(`permission_id`),
    INDEX `permission_role_role_id_foreign`(`role_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permissions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `queue_formats` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,
    `format` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `queue_formats_type_unique`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `queue_numbers` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(255) NOT NULL,
    `last_number` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_user` (
    `user_id` CHAR(255) NOT NULL,
    `role_id` BIGINT UNSIGNED NOT NULL,

    INDEX `role_user_role_id_foreign`(`role_id`),
    INDEX `role_user_user_id_foreign`(`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(255) NOT NULL,
    `user_id` BIGINT UNSIGNED NULL,
    `ip_address` VARCHAR(45) NULL,
    `user_agent` TEXT NULL,
    `payload` LONGTEXT NOT NULL,
    `last_activity` INTEGER NOT NULL,

    INDEX `sessions_last_activity_index`(`last_activity`),
    INDEX `sessions_user_id_index`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `setups` (
    `loading_id` CHAR(255) NOT NULL,
    `loading_description` VARCHAR(255) NOT NULL,
    `vehicle_type_id` CHAR(255) NOT NULL,
    `goods_type_id` CHAR(255) NOT NULL,
    `gate_id` CHAR(255) NOT NULL,
    `dock_id` CHAR(255) NOT NULL,
    `leadtime` DECIMAL(8, 2) NOT NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',

    INDEX `setups_dock_id_foreign`(`dock_id`),
    INDEX `setups_gate_id_foreign`(`gate_id`),
    INDEX `setups_goods_type_id_foreign`(`goods_type_id`),
    INDEX `setups_vehicle_type_id_foreign`(`vehicle_type_id`),
    PRIMARY KEY (`loading_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `unloading_setups` (
    `loading_id` CHAR(255) NOT NULL,
    `loading_description` VARCHAR(255) NOT NULL,
    `vehicle_type_id` CHAR(255) NOT NULL,
    `goods_type_id` CHAR(255) NOT NULL,
    `gate_id` CHAR(255) NOT NULL,
    `dock_id` CHAR(255) NOT NULL,
    `leadtime` DECIMAL(8, 2) NOT NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',

    INDEX `unloading_setups_dock_id_foreign`(`dock_id`),
    INDEX `unloading_setups_gate_id_foreign`(`gate_id`),
    INDEX `unloading_setups_goods_type_id_foreign`(`goods_type_id`),
    INDEX `unloading_setups_vehicle_type_id_foreign`(`vehicle_type_id`),
    PRIMARY KEY (`loading_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` CHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `entity` ENUM('CKB', 'Non-CKB') NOT NULL DEFAULT 'CKB',
    `location_id` CHAR(255) NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
    `remember_token` VARCHAR(100) NULL,

    UNIQUE INDEX `users_username_unique`(`username`),
    INDEX `users_location_id_foreign`(`location_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `vehicle_types` (
    `vehicle_type_id` CHAR(255) NOT NULL,
    `vehicle_type` VARCHAR(255) NOT NULL,
    `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',

    PRIMARY KEY (`vehicle_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Slot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `time` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `transaction_no` VARCHAR(100) NOT NULL,
    `queue` VARCHAR(100) NOT NULL,
    `activity` ENUM('Loading', 'Unloading') NOT NULL,
    `ref_doc_type` CHAR(100) NOT NULL,
    `ref_doc_no` CHAR(100) NOT NULL,
    `customer_id` CHAR(100) NOT NULL,
    `driver` VARCHAR(100) NOT NULL,
    `no_kendaraan` CHAR(100) NOT NULL,
    `vehicle_type_id` VARCHAR(100) NOT NULL,
    `container_no` CHAR(100) NOT NULL,
    `good_type_id` CHAR(100) NOT NULL,
    `no_hp` INTEGER NOT NULL,
    `booking_date` DATE NULL,
    `booking_time` TIME NULL,
    `dock_id` CHAR(100) NOT NULL,
    `isBooking` BOOLEAN NOT NULL DEFAULT true,
    `status` ENUM('Booked', 'Open', 'Gate In', 'In Progress', 'Loaded', 'Unloaded', 'Gate Out', 'Cancel') NOT NULL,
    `slot_id` INTEGER NOT NULL,
    `process_start` DATETIME NULL,
    `process_finish` DATETIME NULL,
    `estimated_leadingtime` TIME NULL,
    `actual_leadingtime` TIME NULL,
    `checker_id` CHAR(100) NULL,
    `leadtime_gate_in_out` TIME NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `docks` ADD CONSTRAINT `docks_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `locations`(`location_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `gates` ADD CONSTRAINT `gates_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `locations`(`location_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `permission_role` ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `permission_role` ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_user` ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_user` ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `setups` ADD CONSTRAINT `setups_dock_id_foreign` FOREIGN KEY (`dock_id`) REFERENCES `docks`(`dock_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `setups` ADD CONSTRAINT `setups_gate_id_foreign` FOREIGN KEY (`gate_id`) REFERENCES `gates`(`gate_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `setups` ADD CONSTRAINT `setups_goods_type_id_foreign` FOREIGN KEY (`goods_type_id`) REFERENCES `goods_types`(`goods_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `setups` ADD CONSTRAINT `setups_vehicle_type_id_foreign` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types`(`vehicle_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `unloading_setups` ADD CONSTRAINT `unloading_setups_dock_id_foreign` FOREIGN KEY (`dock_id`) REFERENCES `docks`(`dock_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `unloading_setups` ADD CONSTRAINT `unloading_setups_gate_id_foreign` FOREIGN KEY (`gate_id`) REFERENCES `gates`(`gate_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `unloading_setups` ADD CONSTRAINT `unloading_setups_goods_type_id_foreign` FOREIGN KEY (`goods_type_id`) REFERENCES `goods_types`(`goods_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `unloading_setups` ADD CONSTRAINT `unloading_setups_vehicle_type_id_foreign` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types`(`vehicle_type_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `locations`(`location_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_vehicle_type_id_fkey` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types`(`vehicle_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_good_type_id_fkey` FOREIGN KEY (`good_type_id`) REFERENCES `goods_types`(`goods_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_slot_id_fkey` FOREIGN KEY (`slot_id`) REFERENCES `Slot`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_dock_id_fkey` FOREIGN KEY (`dock_id`) REFERENCES `docks`(`dock_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
