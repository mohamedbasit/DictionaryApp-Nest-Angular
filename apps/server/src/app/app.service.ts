import { Injectable, HttpService } from '@nestjs/common';
import { Message } from '@dictionary/interfaces';
import { ConfigService } from '@nestjs/config';
import { map, catchError } from "rxjs/operators";
import { throwError } from 'rxjs';
import { path } from './app.const';

@Injectable()
export class AppService {
  baseurl: string;
  customheaders: any;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService) {

    this.baseurl = this.configService.get('api.endpoint');
    this.customheaders = {
      "x-rapidapi-host": this.configService.get('api.host'),
      "x-rapidapi-key": this.configService.get('api.key')
    };
  }

  getMeaning(word = ""): any {
    let url = this.baseurl + path.getMeaning + word;
    return this.httpService.get(url, { headers: this.customheaders })
  }

  getSearchSuggestions(term = ""): any {
    let resultLimit = 5;
    let url = this.baseurl +
      path.getSearchSuggestion + term + path.limit + resultLimit;

    return this.httpService.get(url, { headers: this.customheaders })
  }
}
