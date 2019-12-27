import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SimpleDatatableModule } from '../../shared/simple-datatable/simple-datatable.module';

import { FieldListMasterRouting } from './field-list-master.routing';
import { FieldListMasterComponent } from './field-list-master.component';
import { FieldListMasterService } from './field-list-master.service';

@NgModule({
  declarations: [FieldListMasterComponent],
  imports: [
    CommonModule,
    FieldListMasterRouting,

    SimpleDatatableModule
  ],
  providers: [
    FieldListMasterService
  ]
})
export class FieldListMasterModule { }
