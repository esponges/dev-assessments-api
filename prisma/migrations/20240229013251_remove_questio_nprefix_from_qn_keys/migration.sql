/*
  Warnings:

  - You are about to drop the column `questionText` on the `AssessmentQuestion` table. All the data in the column will be lost.
  - You are about to drop the column `questionType` on the `AssessmentQuestion` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AssessmentQuestion" DROP COLUMN "questionText";
ALTER TABLE "AssessmentQuestion" DROP COLUMN "questionType";
ALTER TABLE "AssessmentQuestion" ADD COLUMN     "text" STRING NOT NULL DEFAULT '';
ALTER TABLE "AssessmentQuestion" ADD COLUMN     "type" STRING NOT NULL DEFAULT '';
