/*
  Warnings:

  - You are about to drop the column `body` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "body",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "tag" TEXT[];
