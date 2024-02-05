-- CreateTable
CREATE TABLE "QuestionMetadata" (
    "id" STRING NOT NULL,
    "question_type" STRING NOT NULL,
    "topic" STRING NOT NULL,
    "difficulty" STRING NOT NULL,

    CONSTRAINT "QuestionMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" STRING NOT NULL,
    "content" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "metadataId" STRING NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Question_metadataId_key" ON "Question"("metadataId");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_metadataId_fkey" FOREIGN KEY ("metadataId") REFERENCES "QuestionMetadata"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
