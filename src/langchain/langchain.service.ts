import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { createStructuredOutputRunnable } from 'langchain/chains/openai_functions';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';
import {
  ChatPromptTemplate,
  type BaseMessagePromptTemplateLike,
} from '@langchain/core/prompts';
import { InputValues } from '@langchain/core/utils/types';

@Injectable({})
export class LangchainService {
  private chatOpenAI: ChatOpenAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY || '',
    modelName: 'gpt-4',
  });
  private outputParser = new JsonOutputFunctionsParser();

  constructor() {
    console.log('LangchainService constructor created');
  }

  generatePrompt(
    promptMessages: (
      | ChatPromptTemplate<InputValues, string>
      | BaseMessagePromptTemplateLike
    )[],
  ) {
    const prompt = ChatPromptTemplate.fromMessages(promptMessages);
    return prompt;
  }

  getRunnable(
    schema: Record<string, any>,
    prompt: ChatPromptTemplate<any, any>, // fix this hack
  ) {
    const runnable = createStructuredOutputRunnable({
      outputSchema: schema,
      llm: this.chatOpenAI,
      prompt,
      outputParser: this.outputParser,
    });

    return runnable;
  }

  getClient() {
    return this.chatOpenAI;
  }
}
