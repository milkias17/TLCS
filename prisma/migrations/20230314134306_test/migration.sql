/*
  Warnings:

  - You are about to drop the column `department` on the `Course` table. All the data in the column will be lost.
  - The values [LECTURER,DEPT_HEAD] on the enum `User_role` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `dept` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Course` DROP COLUMN `department`,
    ADD COLUMN `dept` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('STUDENT', 'COLLEGE_COORDINATOR', 'INSTRUCTOR', 'ADMIN', 'DEPTHEAD') NOT NULL;
