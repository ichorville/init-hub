import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridGeneratorComponent } from './grid-generator.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: '/customizé',
		pathMatch: 'full'
	},
  {
    path: 'grids',
    component: GridGeneratorComponent
  },
  {
    path: 'grids/:id',
    component: GridGeneratorComponent
  } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridGeneratorRouting { }