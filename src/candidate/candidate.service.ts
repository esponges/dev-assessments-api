import { HttpException, Injectable } from '@nestjs/common';
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
import { createStackList } from 'src/assessments/prompts';

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

    // todo: make the LLM say the candidate level: junior, mid, senior
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
      const detailedTechStack = response.tech_stack?.map(
        ({ tech, experience }) => ({
          tech: sanitizeString(tech),
          experience: experience,
        }),
      );

      const metadata = {
        id: randomUUID(),
        tech_stack: stack,
      };

      try {
        // todo: make all of these transactional (if possible)

        const vectorContent = `
        ${file}\n 
        Stack details:\n
        ${createStackList(response.tech_stack)}
        `;

        await this.pineconeService.upsert(
          vectorContent,
          'candidates',
          metadata,
        );

        await this.prismaService.candidateResume.create({
          data: {
            id: metadata.id,
            techStack: stack,
            detailedTechStack,
            resume: file,
          },
        });

        // todo: upload file to blob storage
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
    const searchResults = await this.pineconeService.makeSimilaritySearch(
      resume,
      'candidates',
    );

    const ids = searchResults.similaritySearchResults.matches.map(
      (match) => match.id,
    );

    const candidates = await this.prismaService.candidateResume.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    // add metadata and score to candidates
    const candidatesWithMetadata = candidates.map((candidate) => {
      const match = searchResults.similaritySearchResults.matches.find(
        (match) => match.id === candidate.id,
      );
      return {
        ...candidate,
        score: match?.score || 0,
        metadata: match?.metadata,
      };
    });

    // sort by highest score
    candidatesWithMetadata.sort((a, b) => b.score - a.score);

    return {
      searchResults,
      candidates: candidatesWithMetadata,
    };
  }

  async getCandidate(id: string) {
    const candidate = await this.prismaService.candidateResume.findUnique({
      where: {
        id,
      },
    });

    if (!candidate) {
      throw new HttpException(`Candidate with id ${id} not found`, 404);
    }

    return candidate;
  }
}
