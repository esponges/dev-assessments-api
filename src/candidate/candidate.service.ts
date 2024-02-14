import { Injectable } from '@nestjs/common';
import { WebPDFLoader } from 'langchain/document_loaders/web/pdf';
import { randomUUID } from 'crypto';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

import { LangchainService } from 'src/langchain/langchain.service';
import { PineconeService } from 'src/pinecone/pinecone.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getCandidateTechStackPrompt } from './prompts/candidate';
import {
  type CandidateTechStackSchemaLLMResponse,
  candidateTechStackSchema,
} from './structured-schema/candidate-tech-stack';

import { type Document } from 'langchain/document';

// remove spaces, and special characters from string
function sanitizeString(str: string) {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

@Injectable()
export class CandidateService {
  private readonly schema = candidateTechStackSchema;
  constructor(
    private readonly langchain: LangchainService,
    private readonly pineconeService: PineconeService,
    private readonly prismaService: PrismaService,
  ) {}

  async parseResume(file: Blob | string, upsertToVectorStore?: boolean) {
    const isBlob = file instanceof Blob;
    let docs: Document[];
    let loader: WebPDFLoader;

    if (isBlob) {
      loader = new WebPDFLoader(file, {
        splitPages: false,
      });
      docs = await loader.load();
    } else {
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 1,
      });
      docs = await splitter.createDocuments([file]);
    }

    const prompts = getCandidateTechStackPrompt(
      isBlob ? docs[0].pageContent : file,
    );
    const prompt = this.langchain.generatePrompt(prompts.promptMessages);
    const runnable = this.langchain.getRunnable(this.schema, prompt);

    const response = (await runnable.invoke({
      description: prompts.description,
    })) as CandidateTechStackSchemaLLMResponse;

    // todo: also accept blobs
    if (upsertToVectorStore && !isBlob && response.tech_stack) {
      const stack = response.tech_stack?.map(({ tech }) =>
        // remove spaces, and special characters from string for easier metadata filtering
        sanitizeString(tech),
      );
      const metadata = {
        id: randomUUID(),
        tech_stack: stack,
      };

      try {
        // todo: make all of these transactional
        await this.pineconeService.upsert(
          file,
          'candidate_tech_stack',
          metadata,
        );

        await this.prismaService.candidateResume.create({
          data: {
            id: metadata.id,
            techStack: stack,
            resume: file,
          },
        });
      } catch (e) {
        console.error('Error upserting to vector store', e);
      }
    }

    return {
      originalParsedDocs: docs,
      LLMParsedResponse: response,
      upserted: upsertToVectorStore && !isBlob,
    };
  }

  async getSimilarCandidates(resume: string) {
    return this.pineconeService.makeSimilaritySearch(
      resume,
      'candidate_tech_stack',
    );
  }
}
