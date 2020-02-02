import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subscription, Subject, of, throwError } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap, map, finalize, catchError, mergeMap } from "rxjs/operators";
import { FinderService } from './finder.service';
import { MatAutocompleteTrigger } from '@angular/material';
import { Suggestions, Word } from '@dictionary/interfaces';

@Component({
  selector: 'app-finder',
  templateUrl: './finder.component.html',
  styleUrls: ['./finder.component.scss']
})
export class FinderComponent implements OnInit {

  //To get autocomplete control
  @ViewChild('autoCompleteInput', { read: MatAutocompleteTrigger, static: false }) autoComplete: MatAutocompleteTrigger;
  //To emit event to parent on selection of word
  @Output() onSelectedOption = new EventEmitter<any>();

  searchControl: FormControl;
  //To collect all the subscriptions
  subscriptionList: Subscription = new Subscription();
  //Multicast : To push value to the  subscribers on enter
  keyEnter = new Subject<KeyboardEvent>();
  filteredResults: string[];
  searchResults: Word;
  //Spinner flag
  isLoading = false;

  constructor(private fb: FormBuilder, private finder: FinderService) {
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.searchControl = new FormControl('');

    this.subscriptionList.add(this.searchSuggestion());

    this.subscriptionList.add(this.searchOnEnter());
  }


  private searchOnEnter() {
    return this.keyEnter.pipe(
      map((event: any) => event.target.value),
      // Pause for 1000ms
      debounceTime(300),
      // Only if the value has changed
      distinctUntilChanged(),
      //To allow multiple inner subscription active at a time
      mergeMap(search => this.finder.findMeaning(search)),
      //TO handle subscriptions errors
      catchError(this.errorCallback))
      .subscribe(this.searchCallback);
  }


  private searchSuggestion(): Subscription {
    return this.searchControl.valueChanges
      .pipe(
        // Pause for 1000ms
        debounceTime(300), tap(() => this.isLoading = true),
        // Only if the value has changed
        distinctUntilChanged(),
        //To make only one inner subscription active
        switchMap(args => this.getSuggestion(args)
          //Logic to execute once subscription complete
          .pipe(finalize(() => this.isLoading = false))),
        catchError(this.errorCallback))
      .subscribe((result: string[]) => { this.filteredResults = result });
  }

  //To get the suggestion via api
  getSuggestion(term: string): Observable<string[]> {
    return this.finder.searchSuggestion(term).pipe(map((response: Suggestions) =>
      response ? response.results ? response.results.data : [] : []));
  }

  //To find the word meaning via api
  findMeaning(word: string): void {
    this.subscriptionList.add(this.finder.findMeaning(word)
      .pipe(catchError(this.errorCallback))
      .subscribe(this.searchCallback));
  }

  //Success handler
  searchCallback = (result: Word): void => {
    this.autoCompleteClose();
    this.searchResults = result;
    this.onSelectedOption.emit(result);
  };

  //Error handler
  errorCallback = (error: any) => {
    console.log('ERROR', error);
    return throwError(error);
  }

  //To close autocomplete panel
  autoCompleteClose(): void {
    this.autoComplete.closePanel();
  }

  //To unsubscribe all the subscription
  ngOnDestroy(): void {
    this.subscriptionList.unsubscribe();
  }
}
