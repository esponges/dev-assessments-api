-- AlterTable
ALTER TABLE "AssessmentQuestion" ADD COLUMN     "topic" STRING NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "QuestionDifficulty" (
    "id" STRING NOT NULL,
    "difficulty" STRING NOT NULL,
    "value" INT4 NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionDifficulty_pkey" PRIMARY KEY ("id")
);
