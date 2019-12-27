import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormGeneratorComponent } from './form-generator.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';

import { MatSidenavModule } from '@angular/material/sidenav';

import { NgSelectModule } from '@ng-select/ng-select';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { GridsterModule } from 'angular2gridster';

import { BsDatepickerModule, AccordionModule, ModalModule } from 'ngx-bootstrap';

import { SharedListModule } from '../../shared/shared-list/shared-list.module';
import { ExpressionBuilderModule } from '../../shared/expression-builder/expression-builder.module';

import { FormGeneratorRouting } from './form-generator.routing';
import { FieldGridComponent } from './field-grid/field-grid.component';

import { FormGeneratorService } from './form-generator.service';
import { FormPreviewComponent } from './form-preview/form-preview.component';
import { FieldMetaDataComponent } from './form-meta-data/field-meta-data/field-meta-data.component';
import { CsiAgGridModule } from '@csi/csi-ag-grid';

import { CsiDynamicFormModule } from '@csi/csi-dynamic-form';
// import { CsiDynamicFormModule } from '../../../../projects/csi-dynamic-form/src/lib/csi-dynamic-form.module';

import { FormMetaDataComponent } from './form-meta-data/form-meta-data.component';
import { GridMetaDataComponent } from './form-meta-data/grid-meta-data/grid-meta-data.component';
import { FormSettingsComponent } from './form-settings/form-settings.component';
import { FormAuditComponent } from './form-audit/form-audit.component';
import { FieldUsageComponent } from './field-usage/field-usage.component';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatToolbarModule, MatExpansionModule, MatListModule } from '@angular/material';
import { FormAddFieldComponent } from './form-add-field/form-add-field.component';
import { FormFieldPropertiesModule } from './form-field-properties/form-field-properties.module';
//import { FieldGeneratorService } from '../field-generator/field-generator.service';
import { API_GATEWAY } from 'src/environments/environment';
import { FieldPropertiesComponent } from './field-properties/field-properties.component';
import { FieldPropertiesModule } from './field-properties/field-properties.module';
import { TabMetaDataComponent } from './form-meta-data/tab-meta-data/tab-meta-data.component';

@NgModule({
  declarations: [
    FormSettingsComponent,
    FormGeneratorComponent,
    FieldGridComponent,
    FormPreviewComponent,
    FieldMetaDataComponent,
    FormMetaDataComponent,
    GridMetaDataComponent,
    FormAuditComponent,
    FieldUsageComponent,
    FormAddFieldComponent
    FieldDesignerComponent,
    TreeviewSelectComponent,
    SetupTreeComponent,
    TabMetaDataComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    FormGeneratorRouting,
    // FormFieldPropertiesModule,
    CsiAgGridModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatSelectModule,
    MatTabsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot(),
    CKEditorModule,
    ExpressionBuilderModule,
    SharedListModule,
    GridsterModule.forRoot(),

    CsiDynamicFormModule.forRoot({
      SERVER: API_GATEWAY.SERVER
    }),
    FieldPropertiesModule
  ],
  providers: [
   // FieldGeneratorService
  ],
  entryComponents: [
    FormSettingsComponent,
    FormPreviewComponent,
    FieldMetaDataComponent,
    FieldUsageComponent
  ]
})
export class FormGeneratorModule { }
