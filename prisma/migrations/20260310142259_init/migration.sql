-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'ADULT', 'SENIOR');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "IndependenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "EnvironmentType" AS ENUM ('SMALL_SPACE', 'LARGE_SPACE');

-- CreateTable
CREATE TABLE "orgs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "responsible_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "latitude" DECIMAL(65,30),
    "longitude" DECIMAL(65,30),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "age" "Age" NOT NULL DEFAULT 'PUPPY',
    "about" TEXT NOT NULL,
    "size" "Size" NOT NULL DEFAULT 'SMALL',
    "energy_level" INTEGER NOT NULL,
    "independence_level" "IndependenceLevel" NOT NULL DEFAULT 'LOW',
    "environment_type" "EnvironmentType" NOT NULL DEFAULT 'SMALL_SPACE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "org_id" UUID NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pet_photos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" TEXT NOT NULL,
    "pet_id" UUID NOT NULL,

    CONSTRAINT "pet_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption_requirements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" TEXT NOT NULL,
    "pet_id" UUID NOT NULL,

    CONSTRAINT "adoption_requirements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pet_photos" ADD CONSTRAINT "pet_photos_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption_requirements" ADD CONSTRAINT "adoption_requirements_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
