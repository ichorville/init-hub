import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { TabsModule } from 'ngx-bootstrap/tabs';

import { SharedListModule } from '../../shared/shared-list/shared-list.module';

import { GridGeneratorRouting } from './grid-generator.routing';
import { GridGeneratorComponent } from './grid-generator.component';
import { GridGeneratorService } from './grid-generator.service';

@NgModule({
  declarations: [
    GridGeneratorComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    GridGeneratorRouting,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatChipsModule,
    MatCheckboxModule,

    TabsModule.forRoot(),

    SharedListModule
  ],
  providers: [
    GridGeneratorService
  ]
})
export class GridGeneratorModule { }
