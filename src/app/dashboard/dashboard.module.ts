import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';

import { DashboardRoutingModule } from './dashboard.routing';
import { CsiDynamicFormLoaderModule } from 'projects/csi-dynamic-form-loader/src/public-api';
// import { CsiDynamicFormLoaderModule, CsiDynamicFormLoaderService } from '@csi/csi-dynamic-form-loader';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import {API_GATEWAY} from "../../environments/environment";

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    NgSelectModule,
    CsiDynamicFormLoaderModule.forRoot({
      SERVER: API_GATEWAY.SERVER,
      APPLICATION: 'EHR',
    }),
    // CsiDynamicFormLoaderModule.forRoot({API_GATEWAY_SERVER:"http://dev.k8s.local"}),
  ],
  exports: [
    DashboardComponent
  ],
  providers:[]
})
export class DashboardModule { }
