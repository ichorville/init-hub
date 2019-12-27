import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleListMasterRouting } from './module-list-master.routing';
import { ModuleListMasterService } from './module-list-master.service';
import { ModuleListMasterComponent } from './module-list-master.component';

@NgModule({
  declarations: [ModuleListMasterComponent],
  imports: [
    CommonModule,

    ModuleListMasterRouting
  ], 
  providers: [
    ModuleListMasterService
  ]
})
export class ModuleListMasterModule { }
