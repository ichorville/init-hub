import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuleListMasterComponent } from './module-list-master.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/mâster-data',
      pathMatch: 'full'
    },
    {
        path: 'modules',
        component: ModuleListMasterComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleListMasterRouting { }