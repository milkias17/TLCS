/*
  Warnings:

  - You are about to drop the column `Dept` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `Dept` on the `Student` table. All the data in the column will be lost.
  - Added the required column `dept` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Made the column `chapter_length` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `no_week_take` on table `Course` required. This step will fail if there are existing NULL values in that column.
  - Made the column `event_name` on table `Course_event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `event_type` on table `Course_event` required. This step will fail if there are existing NULL values in that column.
  - Made the column `event_date` on table `Course_event` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `dept` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Made the column `rating` on table `feedback` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Departments" AS ENUM ('SOFTWARE', 'MECHANICAL', 'ELECTRICAL', 'LAW', 'MEDICINE');

-- DropIndex
DROP INDEX "Student_batch_Dept_idx";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "Dept",
ADD COLUMN     "dept" TEXT NOT NULL,
ALTER COLUMN "chapter_length" SET NOT NULL,
ALTER COLUMN "no_week_take" SET NOT NULL;

-- AlterTable
ALTER TABLE "Course_event" ALTER COLUMN "event_name" SET NOT NULL,
ALTER COLUMN "event_type" SET NOT NULL,
ALTER COLUMN "event_date" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "Dept",
ADD COLUMN     "dept" "Departments" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "batch" TEXT,
ADD COLUMN     "college" TEXT,
ADD COLUMN     "department" TEXT;

-- AlterTable
ALTER TABLE "feedback" ALTER COLUMN "rating" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Student_batch_dept_idx" ON "Student"("batch", "dept");
