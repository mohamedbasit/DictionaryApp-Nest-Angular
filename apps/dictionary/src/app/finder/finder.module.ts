import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { FinderComponent } from './finder.component';
/**
 * Note: Since one component is there, no route for feature module
 */

@NgModule({
  declarations: [FinderComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  exports: [FinderComponent],
  entryComponents: [FinderComponent]
})
export class FinderModule { }
