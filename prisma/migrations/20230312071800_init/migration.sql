-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('STUDENT', 'COLLEGE_COORDINATOR', 'INSTRUCTOR', 'ADMIN', 'DEPTHEAD');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "bio" TEXT,
    "photo" TEXT,
    "phone_number" TEXT,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Student" (
    "user_id" TEXT NOT NULL,
    "batch" INTEGER NOT NULL,
    "Dept" TEXT,
    "college" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "College_coordinator" (
    "user_id" TEXT NOT NULL,
    "college" TEXT,

    CONSTRAINT "College_coordinator_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "user_id" TEXT NOT NULL,
    "Dept" TEXT,
    "college" TEXT,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Course" (
    "course_code" TEXT NOT NULL,
    "course_name" TEXT NOT NULL,
    "batch" INTEGER NOT NULL,
    "Dept" TEXT,
    "chapter_length" INTEGER,
    "no_week_take" INTEGER,
    "description" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("course_code")
);

-- CreateTable
CREATE TABLE "Course_event" (
    "event_id" SERIAL NOT NULL,
    "course_code" TEXT NOT NULL,
    "event_name" TEXT,
    "event_type" TEXT,
    "event_date" TIMESTAMP(3),
    "discription" TEXT,

    CONSTRAINT "Course_event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "feedback" (
    "feedback_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_code" TEXT NOT NULL,
    "rating" INTEGER,
    "comment" TEXT,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("feedback_id")
);

-- CreateTable
CREATE TABLE "Course_outline" (
    "course_code" TEXT NOT NULL,
    "course_objectives" TEXT,
    "topics" TEXT,
    "learning_outcomes" TEXT,
    "no_chapterperweek" INTEGER,

    CONSTRAINT "Course_outline_pkey" PRIMARY KEY ("course_code")
);

-- CreateTable
CREATE TABLE "Progress" (
    "progress_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_code" TEXT NOT NULL,
    "percent_complete" INTEGER,

    CONSTRAINT "Progress_pkey" PRIMARY KEY ("progress_id")
);

-- CreateTable
CREATE TABLE "Enrolment" (
    "enrolment_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_code" TEXT NOT NULL,

    CONSTRAINT "Enrolment_pkey" PRIMARY KEY ("enrolment_id")
);

-- CreateTable
CREATE TABLE "Course_assignment" (
    "assignment_id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "course_code" TEXT NOT NULL,

    CONSTRAINT "Course_assignment_pkey" PRIMARY KEY ("assignment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Student_batch_Dept_idx" ON "Student"("batch", "Dept");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "College_coordinator" ADD CONSTRAINT "College_coordinator_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_event" ADD CONSTRAINT "Course_event_course_code_fkey" FOREIGN KEY ("course_code") REFERENCES "Course"("course_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "feedback" ADD CONSTRAINT "feedback_course_code_fkey" FOREIGN KEY ("course_code") REFERENCES "Course"("course_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_outline" ADD CONSTRAINT "Course_outline_course_code_fkey" FOREIGN KEY ("course_code") REFERENCES "Course"("course_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_course_code_fkey" FOREIGN KEY ("course_code") REFERENCES "Course"("course_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrolment" ADD CONSTRAINT "Enrolment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrolment" ADD CONSTRAINT "Enrolment_course_code_fkey" FOREIGN KEY ("course_code") REFERENCES "Course"("course_code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_assignment" ADD CONSTRAINT "Course_assignment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course_assignment" ADD CONSTRAINT "Course_assignment_course_code_fkey" FOREIGN KEY ("course_code") REFERENCES "Course"("course_code") ON DELETE RESTRICT ON UPDATE CASCADE;
