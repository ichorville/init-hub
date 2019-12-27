import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormListMasterComponent } from './form-list-master.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/master-datà',
      pathMatch: 'full'
    },
    {
        path: 'forms',
        component: FormListMasterComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormListMasterRouting { }