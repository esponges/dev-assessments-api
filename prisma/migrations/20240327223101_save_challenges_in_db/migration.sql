-- CreateTable
CREATE TABLE "Challenge" (
    "id" STRING NOT NULL,
    "title" STRING,
    "content" STRING NOT NULL,
    "stack" STRING NOT NULL,
    "stackExperience" STRING NOT NULL,
    "solution" STRING,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandidateChallenge" (
    "id" STRING NOT NULL,
    "solution" STRING,
    "devSolution" STRING NOT NULL,
    "codeQuality" STRING NOT NULL,
    "codeCorrectness" STRING NOT NULL,
    "codeEfficiency" STRING NOT NULL,
    "codeMaintainability" STRING NOT NULL,
    "feedbackMessage" STRING NOT NULL,
    "userId" STRING NOT NULL DEFAULT 'anonymous',
    "challengeId" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandidateChallenge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CandidateChallenge" ADD CONSTRAINT "CandidateChallenge_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CandidateChallenge" ADD CONSTRAINT "CandidateChallenge_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
