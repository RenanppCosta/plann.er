-- CreateTable
CREATE TABLE `Participant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `is_confirmed` BOOLEAN NOT NULL DEFAULT false,
    `is_owner` BOOLEAN NOT NULL DEFAULT false,
    `trip_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Participant` ADD CONSTRAINT `Participant_trip_id_fkey` FOREIGN KEY (`trip_id`) REFERENCES `Trip`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
