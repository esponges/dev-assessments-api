-- CreateTable
CREATE TABLE "CandidateResume" (
    "id" STRING NOT NULL,
    "resume" STRING NOT NULL,
    "techStack" STRING[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateResume_pkey" PRIMARY KEY ("id")
);
