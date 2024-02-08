import { Injectable } from '@nestjs/common';
import { LangchainService } from 'src/langchain/langchain.service';
import { getCandidateTechStackPrompt } from './prompts/candidate';
import { candidateTechStackSchema } from './structured-schema/candidate-tech-stack';
import { WebPDFLoader } from 'langchain/document_loaders/web/pdf';

@Injectable()
export class CandidateService {
  private readonly schema = candidateTechStackSchema;
  constructor(private readonly langchain: LangchainService) {}

  async parseResume(file: Blob) {
    const loader = new WebPDFLoader(file, {
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
