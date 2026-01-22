/*
  Warnings:

  - A unique constraint covering the columns `[userId,postId,type]` on the table `Engagement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,postId]` on the table `Save` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Engagement_userId_postId_type_key" ON "Engagement"("userId", "postId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Save_userId_postId_key" ON "Save"("userId", "postId");
