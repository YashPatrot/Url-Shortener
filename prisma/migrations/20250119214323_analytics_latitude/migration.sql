/*
  Warnings:

  - Changed the type of `latitude` on the `Analytics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `longitude` on the `Analytics` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "latitude",
ADD COLUMN     "latitude" JSONB NOT NULL,
DROP COLUMN "longitude",
ADD COLUMN     "longitude" JSONB NOT NULL;
