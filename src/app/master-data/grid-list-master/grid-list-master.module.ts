import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleDatatableModule } from '../../shared/simple-datatable/simple-datatable.module';

import { GridListMasterRouting } from './grid-list-master.routing';
import { GridListMasterComponent } from './grid-list-master.component';
import { GridListMasterService } from './grid-list.master.service';

@NgModule({
  declarations: [GridListMasterComponent],
  imports: [
    CommonModule,
    GridListMasterRouting,

    SimpleDatatableModule
  ],
  providers: [
    GridListMasterService
  ]
})
export class GridListMasterModule { }
