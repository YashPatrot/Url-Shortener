/*
  Warnings:

  - Added the required column `city` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `continentName` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `countryName` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isEu` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latitude` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionName` to the `Analytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Analytics" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "continentName" TEXT NOT NULL,
ADD COLUMN     "countryFlagEmoj" TEXT,
ADD COLUMN     "countryName" TEXT NOT NULL,
ADD COLUMN     "isEu" BOOLEAN NOT NULL,
ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "regionName" TEXT NOT NULL;
