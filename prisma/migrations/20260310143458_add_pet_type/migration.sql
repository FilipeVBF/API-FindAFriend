-- CreateEnum
CREATE TYPE "PetType" AS ENUM ('DOG', 'CAT');

-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "type" "PetType" NOT NULL DEFAULT 'DOG';
