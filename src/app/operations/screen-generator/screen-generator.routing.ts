import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenGeneratorComponent } from './screen-generator.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: '/cûstomize',
		pathMatch: 'full'
	},
  {
    path: 'screens',
    component: ScreenGeneratorComponent
  },
  {
    path: 'screens/:id',
    component: ScreenGeneratorComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenGeneratorRouting { }