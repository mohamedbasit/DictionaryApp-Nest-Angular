import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * Added global prefix for url
 * @description
 * ex:
 * @Controller('api') no need to do
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('findMeaning/:word')
  getWordMeaning(@Param('word') word) {
    return this.appService.getMeaning(word);
  }

  @Get('searchSuggestion/:term')
  getSearchSuggestion(@Param('term') term) {
    return this.appService.getSearchSuggestions(term);
  }
}
