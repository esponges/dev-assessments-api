import { Injectable } from '@nestjs/common';
import { ChatOpenAI } from '@langchain/openai';
import { createStructuredOutputRunnable } from 'langchain/chains/openai_functions';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';
import {
  ChatPromptTemplate,
  type BaseMessagePromptTemplateLike,
} from '@langchain/core/prompts';
import { type InputValues } from '@langchain/core/utils/types';

import { Prompt } from 'src/types';

@Injectable({})
export class LangchainService {
  private chatOpenAI: ChatOpenAI = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY || '',
    modelName: 'gpt-4',
  });
  private outputParser = new JsonOutputFunctionsParser();

  constructor() {
    console.log('LangchainService instantiated');
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
    prompt: ChatPromptTemplate<any, any>,
  ) {
    const runnable = createStructuredOutputRunnable({
      outputSchema: schema,
      // other LLMs can be used here, however I openain is the only
      // one that supports structured output
      llm: this.chatOpenAI,
      prompt,
      outputParser: this.outputParser,
    });

    return runnable;
  }

  async getStructuredResponse<T, R = void>(
    args: T,
    schema: Record<string, unknown>,
    promptGenerator: (args: T) => Partial<Prompt>,
  ) {
    const { promptMessages, ...context } = promptGenerator(args);
    const prompt = this.generatePrompt(promptMessages);
    const runnable = this.getRunnable(schema, prompt);

    // fix this `as` type, the type should be passed to the runnable I think
    const response = (await runnable.invoke({ ...context })) as R;

    return response;
  }

  getClient() {
    return this.chatOpenAI;
  }
}
