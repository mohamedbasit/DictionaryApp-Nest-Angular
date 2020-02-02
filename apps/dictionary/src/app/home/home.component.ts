import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor() { }

  maxWords = 5;
  recentSearches = [];
  currentSearch = null;
  color = ['purple', 'blue', 'green', 'yellow', 'red', 'orange', 'black'];

  get pickColour() {
    return this.color[Math.floor(Math.random() * Math.floor(this.color.length))];
  }

  onWordSelection(wordResult) {
    wordResult["label"] = this.pickColour;
    this.currentSearch = wordResult;
    this.saveWords(wordResult);
  }

  saveWords(wordResult) {
    if (this.recentSearches.length >= this.maxWords) {
      this.recentSearches.shift();
    }
    this.recentSearches.push(wordResult);
  }

  onRecentWordClick(searchedItem) {
    this.currentSearch = searchedItem;
  }
}
