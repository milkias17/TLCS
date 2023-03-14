/*
  Warnings:

  - A unique constraint covering the columns `[uuid]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Session_uuid_key" ON "Session"("uuid");
