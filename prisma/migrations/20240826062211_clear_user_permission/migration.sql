/*
  Warnings:

  - A unique constraint covering the columns `[user_id,role_id]` on the table `role_user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `permission_role` DROP FOREIGN KEY `permission_role_permission_id_foreign`;

-- DropForeignKey
ALTER TABLE `permission_role` DROP FOREIGN KEY `permission_role_role_id_foreign`;

-- DropForeignKey
ALTER TABLE `role_user` DROP FOREIGN KEY `role_user_role_id_foreign`;

-- DropForeignKey
ALTER TABLE `role_user` DROP FOREIGN KEY `role_user_user_id_foreign`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_location_id_foreign`;

-- AlterTable
ALTER TABLE `permission_role` ADD PRIMARY KEY (`permission_id`, `role_id`);

-- CreateIndex
CREATE UNIQUE INDEX `role_user_user_id_role_id_key` ON `role_user`(`user_id`, `role_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `locations`(`location_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_user` ADD CONSTRAINT `role_user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `role_user` ADD CONSTRAINT `role_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `permission_role` ADD CONSTRAINT `permission_role_permission_id_fkey` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `permission_role` ADD CONSTRAINT `permission_role_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- RedefineIndex
CREATE INDEX `role_user_role_id_idx` ON `role_user`(`role_id`);
DROP INDEX `role_user_role_id_foreign` ON `role_user`;

-- RedefineIndex
CREATE INDEX `role_user_user_id_idx` ON `role_user`(`user_id`);
DROP INDEX `role_user_user_id_foreign` ON `role_user`;

-- RedefineIndex
CREATE INDEX `users_location_id_idx` ON `users`(`location_id`);
DROP INDEX `users_location_id_foreign` ON `users`;

-- RedefineIndex
CREATE UNIQUE INDEX `users_username_key` ON `users`(`username`);
DROP INDEX `users_username_unique` ON `users`;
