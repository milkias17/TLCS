/*
  Warnings:

  - You are about to drop the column `user_id` on the `Assign_course` table. All the data in the column will be lost.
  - You are about to drop the column `instructor_id` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Enrolment` table. All the data in the column will be lost.
  - Added the required column `instructor_id` to the `Assign_course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `Enrolment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Assign_course" DROP CONSTRAINT "Assign_course_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_instructor_id_fkey";

-- DropForeignKey
ALTER TABLE "Enrolment" DROP CONSTRAINT "Enrolment_user_id_fkey";

-- AlterTable
ALTER TABLE "Assign_course" DROP COLUMN "user_id",
ADD COLUMN     "instructor_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "instructor_id",
ADD COLUMN     "userUser_id" TEXT;

-- AlterTable
ALTER TABLE "Enrolment" DROP COLUMN "user_id",
ADD COLUMN     "student_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "User"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrolment" ADD CONSTRAINT "Enrolment_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assign_course" ADD CONSTRAINT "Assign_course_instructor_id_fkey" FOREIGN KEY ("instructor_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
