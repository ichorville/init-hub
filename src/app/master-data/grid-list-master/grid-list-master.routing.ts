import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GridListMasterComponent } from './grid-list-master.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/master-datâ',
      pathMatch: 'full'
    },
    {
        path: 'grids',
        component: GridListMasterComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GridListMasterRouting { }