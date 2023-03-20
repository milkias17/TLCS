/*
  Warnings:

  - You are about to drop the column `discription` on the `Course_event` table. All the data in the column will be lost.
  - You are about to drop the column `learning_outcomes` on the `Course_outline` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course_event" DROP COLUMN "discription",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Course_outline" DROP COLUMN "learning_outcomes";
