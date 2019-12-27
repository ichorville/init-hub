import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldPropertiesComponent } from './form-field-properties.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TreeviewModule } from 'ngx-treeview';
import { TypeaheadModule } from 'ngx-bootstrap';
import { 
  MatCheckboxModule, 
  MatCardModule, 
  MatButtonToggleModule, 
  MatDividerModule, 
  MatSlideToggleModule, 
  MatSelectModule, 
  MatButtonModule
} from '@angular/material';
import { CsiAgGridModule } from '@csi/csi-ag-grid';
import { SharedListModule } from 'src/app/shared/shared-list/shared-list.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TreeviewSelectComponent } from '../../../shared/setup-tree/treeview-select.component';
import { SetupTreeComponent } from '../../../shared/setup-tree/setup-tree.component';
import { EditorModule } from '@tinymce/tinymce-angular';
@NgModule({
  declarations: [
    FormFieldPropertiesComponent,
    TreeviewSelectComponent,
    SetupTreeComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TreeviewModule.forRoot(),
    TypeaheadModule.forRoot(),
    MatCardModule,
    MatCheckboxModule,
    MatDividerModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSelectModule,
    CsiAgGridModule,
    SharedListModule,
    EditorModule,
    NgSelectModule,
  ],
  exports:[
    FormFieldPropertiesComponent
  ]
})
export class FormFieldPropertiesModule { }
