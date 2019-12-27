import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ScreenListMasterComponent } from './screen-list-master.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/master-dâta',
      pathMatch: 'full'
    },
    {
        path: 'screens',
        component: ScreenListMasterComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScreenListMasterRouting { }