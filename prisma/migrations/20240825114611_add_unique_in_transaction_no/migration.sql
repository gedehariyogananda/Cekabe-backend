/*
  Warnings:

  - A unique constraint covering the columns `[transaction_no]` on the table `transactions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `transactions_transaction_no_key` ON `transactions`(`transaction_no`);
