import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { GridsterModule } from 'angular2gridster';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedListModule } from '../../shared/shared-list/shared-list.module';

import { ScreenGeneratorRouting } from './screen-generator.routing';
import { ScreenGeneratorService } from './screen-generator.service';
import { ScreenGeneratorComponent } from './screen-generator.component';
import { ScreenGridComponent } from './screen-grid/screen-grid.component';
import { ScreenPreviewComponent } from './screen-preview/screen-preview.component';
import { ScreenPreSaveComponent } from './screen-pre-save/screen-pre-save.component';

@NgModule({
  declarations: [
    ScreenGeneratorComponent, 
    ScreenGridComponent, 
    ScreenPreviewComponent, ScreenPreSaveComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,

    TabsModule.forRoot(),

    SharedListModule,
    GridsterModule.forRoot(),

    ScreenGeneratorRouting
  ],
  providers: [
    ScreenGeneratorService
  ],
  entryComponents: [
    ScreenPreviewComponent,
    ScreenPreSaveComponent
  ]
})
export class ScreenGeneratorModule { }
