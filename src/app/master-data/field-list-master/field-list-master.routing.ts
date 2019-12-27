import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FieldListMasterComponent } from './field-list-master.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/master-data',
      pathMatch: 'full'
    },
    {
        path: 'fields',
        component: FieldListMasterComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldListMasterRouting { }