/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `Course` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userUser_id_fkey";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "userUser_id";
