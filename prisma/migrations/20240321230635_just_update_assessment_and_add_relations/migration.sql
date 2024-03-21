/*
  Warnings:

  - You are about to drop the `EvaluatedAssessment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EvaluatedAssessment" DROP CONSTRAINT "EvaluatedAssessment_assessmentId_fkey";

-- DropForeignKey
ALTER TABLE "EvaluatedAssessment" DROP CONSTRAINT "EvaluatedAssessment_candidateId_fkey";

-- DropForeignKey
ALTER TABLE "EvaluatedQuestion" DROP CONSTRAINT "EvaluatedQuestion_assessmentId_fkey";

-- DropTable
DROP TABLE "EvaluatedAssessment";

-- AddForeignKey
ALTER TABLE "EvaluatedQuestion" ADD CONSTRAINT "EvaluatedQuestion_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
