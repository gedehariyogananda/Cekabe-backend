/*
  Warnings:

  - A unique constraint covering the columns `[transaction_no]` on the table `histories` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `histories_transaction_no_key` ON `histories`(`transaction_no`);
