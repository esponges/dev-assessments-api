import { Injectable } from '@nestjs/common';
import { LangchainService } from 'src/langchain/langchain.service';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { getCandidateTechStackPrompt } from './prompts/candidate';
import { candidateTechStackSchema } from './structured-schema/candidate-tech-stack';

@Injectable()
export class CandidateService {
  private readonly schema = candidateTechStackSchema;
  constructor(private readonly langchain: LangchainService) {}

  async parseResume() {
    // path must be inside the src folder (why?)
    // future: will be replaced with a file upload from the frontend
    const loader = new PDFLoader('src/test-docs/test-cv.pdf', {
      splitPages: false,
    });

    const docs = await loader.load();

    const prompts = getCandidateTechStackPrompt(docs[0].pageContent);
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
