import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldGeneratorComponent } from './field-generator.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/customize',
      pathMatch: 'full'
    },
    {
      path: 'fields',
      component: FieldGeneratorComponent
    },
    {
      path: 'fields/:id',
      component: FieldGeneratorComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldGeneratorRouting { }