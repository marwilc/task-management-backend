import { Controller, Post, Body } from '@nestjs/common';
import { SuggestionsService } from './suggestions.service';
import { ChatCompletionMessageParam } from 'openai/resources/index';

@Controller('suggestions')
export class SuggestionsController {
  constructor(private readonly suggestionsService: SuggestionsService) {}

  @Post()
  async suggest(@Body('messages') messages: ChatCompletionMessageParam[]) {
    const suggestion = await this.suggestionsService.getSuggestion(messages);
    return { suggestion };
  }
}
