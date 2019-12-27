import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGeneratorComponent } from './form-generator.component';

const routes: Routes = [
    {
		path: '',
		redirectTo: '/customizè',
		pathMatch: 'full'
	},
  {
      path: 'forms',
      component: FormGeneratorComponent
  },
  {
    path: 'forms/:id?',
    component: FormGeneratorComponent
} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormGeneratorRouting { }