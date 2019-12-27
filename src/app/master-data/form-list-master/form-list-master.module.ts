import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchModule } from '../../shared/search/search.module';
import { SimpleDatatableModule } from '../../shared/simple-datatable/simple-datatable.module';

import { FormListMasterRouting } from './form-list-master.routing';
import { FormListMasterComponent } from './form-list-master.component';
import { FormListMasterService } from './form-list-master.service';

@NgModule({
  declarations: [
    FormListMasterComponent
  ],
  imports: [
    CommonModule,
    FormListMasterRouting,
    SimpleDatatableModule,
    SearchModule
  ],
  providers: [
    FormListMasterService
  ]
})
export class FormListMasterModule { }
