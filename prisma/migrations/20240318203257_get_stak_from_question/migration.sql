/*
  Warnings:

  - You are about to drop the column `topic` on the `AssessmentQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AssessmentQuestion" DROP COLUMN "topic";
ALTER TABLE "AssessmentQuestion" ADD COLUMN     "stack" STRING NOT NULL DEFAULT '';
