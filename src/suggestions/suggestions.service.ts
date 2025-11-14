import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index';

@Injectable()
export class SuggestionsService {
  private readonly openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async getSuggestion(messages: ChatCompletionMessageParam[]): Promise<string> {
    const completion = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.3,
      //   max_tokens: 20,
    });

    return completion.choices[0].message.content ?? '';
  }
}
