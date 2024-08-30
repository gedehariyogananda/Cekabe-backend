-- AlterTable
ALTER TABLE `transactions` ADD COLUMN `gate_in_time` DATETIME(3) NULL,
    ADD COLUMN `gate_out_time` DATETIME(3) NULL;
