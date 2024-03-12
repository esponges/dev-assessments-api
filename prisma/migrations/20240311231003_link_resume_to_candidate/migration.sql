-- AlterTable
ALTER TABLE "CandidateResume" ADD COLUMN     "userId" STRING NOT NULL DEFAULT 'anonymous';

-- CreateIndex
CREATE INDEX "CandidateResume_userId_idx" ON "CandidateResume"("userId");
