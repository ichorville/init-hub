import { NgModule, ModuleWithProviders, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CsiDynamicFormModule } from '@csi/csi-dynamic-form';
import { MatProgressBarModule } from '@angular/material';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CsiDynamicFormLoaderComponent } from './csi-dynamic-form-loader.component';
import { FormLoaderModelComponent } from './form-loader-model/form-loader-model.component';

import { CsiDynamicFormLoaderService } from './csi-dynamic-form-loader.service';
import { FormLoaderConfigs } from './shared/models/form-loader-config.interface';
import { InterfacesModule } from '@csi/csi-ehr-interfaces';
import { ServiceLocator } from './service.locator';
import {FormSelectionDashboardComponent} from "./form-dashboard/form-selection-dashboard/form-selection-dashboard.component";
import { FormSelectionFabComponent } from './form-dashboard/form-selection-fab/form-selection-fab.component';
import { MomentModule } from 'angular2-moment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    MatProgressBarModule,
    InterfacesModule,
    MomentModule,
    CsiDynamicFormModule.forRoot({
      SERVER: '/proxy'
    })
  ],
  declarations: [
    CsiDynamicFormLoaderComponent,
    FormLoaderModelComponent,
    FormSelectionDashboardComponent,
    FormSelectionFabComponent
  ],
  exports: [
    CsiDynamicFormLoaderComponent,
    FormSelectionDashboardComponent,
    FormSelectionFabComponent
  ],
  entryComponents: [
    CsiDynamicFormLoaderComponent,
    FormLoaderModelComponent,
    FormSelectionDashboardComponent
  ],
  providers: [
    CsiDynamicFormLoaderService
  ]
})
export class CsiDynamicFormLoaderModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }

  static forRoot(config: FormLoaderConfigs): ModuleWithProviders {
    return {
      ngModule: CsiDynamicFormLoaderModule,
      providers: [
        CsiDynamicFormLoaderService,
        {
          provide: "CSI_DYNAMIC_FORM_LOADER_CONFIG",
          useValue: config
        }
      ]
    };
  }
}
