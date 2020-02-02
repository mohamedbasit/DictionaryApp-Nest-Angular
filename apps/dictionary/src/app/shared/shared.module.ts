import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { LayoutComponent } from './layout/layout.component';
import { MinLengthPipe } from './min-length.pipe';


//Common Shared modules for appmodules/feature module can be added here
let modules = [MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  LayoutModule,
  MatSidenavModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule];


@NgModule({
  declarations: [LayoutComponent, MinLengthPipe],
  imports: [
    ...modules
  ],
  exports: [LayoutComponent, MinLengthPipe, ...modules]
})
export class SharedModule { }
