import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { path } from './finder.const';

@Injectable({
  providedIn: 'root'
})
export class FinderService {

  constructor(private http: HttpClient) { }

  findMeaning(word:string){
    return this.http.get(path.findMeaning +word);
  }

  searchSuggestion(term:string){
    return this.http.get(path.searchSuggestion+term);
  }
} 
