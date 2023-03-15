-- CreateTable
CREATE TABLE "Session" (
    "user_id" TEXT NOT NULL,
    "uuid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_user_id_key" ON "Session"("user_id");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
