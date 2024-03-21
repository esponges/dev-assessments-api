/*
  Warnings:

  - Added the required column `candidateId` to the `EvaluatedQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EvaluatedQuestion" ADD COLUMN     "candidateId" STRING NOT NULL;

-- AddForeignKey
ALTER TABLE "EvaluatedQuestion" ADD CONSTRAINT "EvaluatedQuestion_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
