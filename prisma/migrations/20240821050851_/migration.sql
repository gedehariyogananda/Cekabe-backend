/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `queue_numbers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `queue_numbers_type_key` ON `queue_numbers`(`type`);
