import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancePropertiesComponent } from './advance-properties.component';
import { AdvanceComponentsModule } from './components/advance-components.module';

@NgModule({
  declarations: [AdvancePropertiesComponent],
  imports: [
    CommonModule,
    AdvanceComponentsModule,
  ],
  exports:[AdvancePropertiesComponent]
})
export class AdvancePropertiesModule { }
