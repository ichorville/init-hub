import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleDatatableModule } from '../../shared/simple-datatable/simple-datatable.module';

import { ScreenListMasterRouting } from './screen-list-master.routing';
import { ScreenListMasterService } from './screen-list-master.service';
import { ScreenListMasterComponent } from './screen-list-master.component';

@NgModule({
  declarations: [
    ScreenListMasterComponent
  ],
  imports: [
    CommonModule,
    ScreenListMasterRouting,

    SimpleDatatableModule
  ],
  providers: [
    ScreenListMasterService
  ]
})
export class ScreenListMasterModule { }
