import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldPropertiesComponent } from './field-properties.component';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'ngx-bootstrap';
import { MatCardModule, MatIconModule } from '@angular/material';
import { GeneralPropertiesModule } from './general-properties/general-properties.module';
import { AdvancePropertiesModule } from './advance-properties/advance-properties.module';

@NgModule({
  declarations: [
    FieldPropertiesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    TabsModule.forRoot(),
    GeneralPropertiesModule,
    AdvancePropertiesModule
  ],
  exports:[
    FieldPropertiesComponent
  ]
})
export class FieldPropertiesModule { }
