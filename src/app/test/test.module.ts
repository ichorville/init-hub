import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { SharedListModule } from '../shared/shared-list/shared-list.module';

import { TestRouting } from './test.routing';
import { ScreenTestComponent } from './screen-test/screen-test.component';
import { FormTestComponent } from './form-test/form-test.component';

import { CsiDynamicFormModule } from '@csi/csi-dynamic-form';

@NgModule({
  declarations: [
    ScreenTestComponent,
    FormTestComponent
  ],
  imports: [
    CommonModule,
    TestRouting,
    SharedListModule,
    MatCardModule,
    CsiDynamicFormModule.forRoot({
      SERVER: 'http://dev.k8s.local'
    })
  ]
})
export class TestModule { }
