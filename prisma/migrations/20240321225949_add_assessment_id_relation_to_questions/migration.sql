-- AddForeignKey
ALTER TABLE "EvaluatedAssessment" ADD CONSTRAINT "EvaluatedAssessment_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
