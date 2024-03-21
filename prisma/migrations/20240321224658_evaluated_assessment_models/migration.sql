-- CreateTable
CREATE TABLE "EvaluatedQuestion" (
    "id" STRING NOT NULL,
    "score" INT4 NOT NULL,
    "feedback" STRING NOT NULL,
    "questionId" STRING NOT NULL,
    "assessmentId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvaluatedQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EvaluatedAssessment" (
    "id" STRING NOT NULL,
    "assessmentId" STRING NOT NULL,
    "score" INT4 NOT NULL,
    "candidateId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EvaluatedAssessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EvaluatedQuestion" ADD CONSTRAINT "EvaluatedQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "AssessmentQuestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedQuestion" ADD CONSTRAINT "EvaluatedQuestion_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "EvaluatedAssessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EvaluatedAssessment" ADD CONSTRAINT "EvaluatedAssessment_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
