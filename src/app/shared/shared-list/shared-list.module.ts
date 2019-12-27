import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material';

import { SearchModule } from '../search/search.module';
import { PaginationModule } from '../pagination/pagination.module';

import { SharedListComponent } from './shared-list.component';
import { SharedListService } from './shared.list.service';

@NgModule({
  declarations: [
    SharedListComponent
  ],
  imports: [
    CommonModule,

    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,

    SearchModule,
    PaginationModule
  ],
  exports: [
    SharedListComponent
  ],
  providers: [
    SharedListService
  ]
})
export class SharedListModule { }
