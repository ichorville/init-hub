import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { TypeaheadModule } from 'ngx-bootstrap';
import { ResourceBindingsComponent } from './resource-bindings/resource-bindings.component';
import { FormsModule } from '@angular/forms';
import { OptionResourcesComponent } from './option-resources/option-resources.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CsiAgGridModule } from '@csi/csi-ag-grid';
import { SetupTreeComponent } from 'src/app/operations/field-generator/setup-tree/setup-tree.component';
import { TreeviewSelectComponent } from 'src/app/shared/setup-tree/treeview-select.component';
import { TreeviewModule } from 'ngx-treeview';

@NgModule({
  declarations: [
    ResourceBindingsComponent,
    OptionResourcesComponent,
    SetupTreeComponent,
    TreeviewSelectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    TreeviewModule.forRoot(),
    TypeaheadModule.forRoot(),
    NgSelectModule,
    CsiAgGridModule,
  ],
  exports:[
    ResourceBindingsComponent,
    OptionResourcesComponent
  ]
})
export class SharedModule { }
