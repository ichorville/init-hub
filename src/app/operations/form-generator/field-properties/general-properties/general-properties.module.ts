import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponentsModule } from './components/general-components.module';
import { GeneralPropertiesComponent } from './general-properties.component';

@NgModule({
  declarations: [GeneralPropertiesComponent],
  imports: [
    CommonModule,
    GeneralComponentsModule,
  ],
  exports:[GeneralPropertiesComponent]
})
export class GeneralPropertiesModule { }
