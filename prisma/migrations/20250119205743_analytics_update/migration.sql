/*
  Warnings:

  - You are about to drop the column `isEu` on the `Analytics` table. All the data in the column will be lost.
  - You are about to drop the column `visitorLocation` on the `Analytics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analytics" DROP COLUMN "isEu",
DROP COLUMN "visitorLocation";
