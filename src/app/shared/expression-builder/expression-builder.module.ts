import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QueryBuilderModule } from "angular2-query-builder";
import { NgSelectModule } from '@ng-select/ng-select';
import { ButtonsModule, TabsModule, AccordionModule } from 'ngx-bootstrap';

import { SharedListModule } from '../shared-list/shared-list.module';

import { ExpressionBuilderComponent } from './expression-builder.component';
import { ExpressionComparerOptionsComponent } from './expression-comparer-options/expression-comparer-options.component';
import { ExpressionActionOptionsComponent } from './expression-action-options/expression-action-options.component';
import { CSIExpressionBuilderService } from './expression-builder.service';

@NgModule({
  declarations: [
    ExpressionBuilderComponent,
    ExpressionComparerOptionsComponent,
    ExpressionActionOptionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QueryBuilderModule,
    NgSelectModule,
    ButtonsModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),

    SharedListModule
  ],
  providers: [
    CSIExpressionBuilderService
  ],
  exports: [
    ExpressionBuilderComponent
  ]
})
export class ExpressionBuilderModule { }
