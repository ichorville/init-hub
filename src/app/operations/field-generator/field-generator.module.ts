import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule, MatSlideToggleModule, MatButtonToggleModule } from '@angular/material';

import { NgSelectModule } from '@ng-select/ng-select';

import { SharedListModule } from '../../shared/shared-list/shared-list.module';

import { FieldGeneratorRouting } from './field-generator.routing';

import { FieldGeneratorComponent } from './field-generator.component';
import { FieldAddComponent } from './field-add/field-add.component';
import { TreeviewModule } from "ngx-treeview";
import { TreeviewSelectComponent } from "./setup-tree/treeview-select.component";
import { SetupTreeComponent } from "./setup-tree/setup-tree.component";
import { CsiAgGridModule } from '@csi/csi-ag-grid';
import { FieldGeneratorService } from './field-generator.service';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    FieldGeneratorComponent,
    FieldAddComponent,
    SetupTreeComponent,
    TreeviewSelectComponent
  ],
  imports: [
    CommonModule,
    FieldGeneratorRouting,
    FormsModule,
    ReactiveFormsModule,
    TreeviewModule.forRoot(),
    TypeaheadModule.forRoot(),
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSelectModule,

    CsiAgGridModule,
    SharedListModule,
    CKEditorModule,
    NgSelectModule
  ],
  exports:[FieldAddComponent],
  providers: [
    FieldGeneratorService
  ]
})
export class FieldGeneratorModule { }
