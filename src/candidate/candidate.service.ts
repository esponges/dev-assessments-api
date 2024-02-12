import { Injectable } from '@nestjs/common';
import { WebPDFLoader } from 'langchain/document_loaders/web/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { type Document } from 'langchain/document';
import { LangchainService } from 'src/langchain/langchain.service';
import { getCandidateTechStackPrompt } from './prompts/candidate';
import { candidateTechStackSchema } from './structured-schema/candidate-tech-stack';

@Injectable()
export class CandidateService {
  private readonly schema = candidateTechStackSchema;
  constructor(private readonly langchain: LangchainService) {}

  async parseResume(file: Blob | string) {
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

    const response = await runnable.invoke({
      description: prompts.description,
    });

    return {
      originalParsedDocs: docs,
      LLMParsedResponse: response,
    };
  }
}
