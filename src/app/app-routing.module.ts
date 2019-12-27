import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import {CsiIamAuthGuard} from '@csi/csi-auth-v2';
import {PermissionGuard} from './_guard/permission.guard';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [CsiIamAuthGuard,PermissionGuard],
    children: [
      {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'customize',
        loadChildren: './operations/field-generator/field-generator.module#FieldGeneratorModule'
      },
      {
        path: 'customizè',
        loadChildren: './operations/form-generator/form-generator.module#FormGeneratorModule'
      },
      {
        path: 'customizé',
        loadChildren: './operations/grid-generator/grid-generator.module#GridGeneratorModule'
      },
      {
        path: 'cûstomize',
        loadChildren: './operations/screen-generator/screen-generator.module#ScreenGeneratorModule'
      },
      {
        path: 'master-data',
        loadChildren: './master-data/field-list-master/field-list-master.module#FieldListMasterModule'
      },
      {
        path: 'master-datà',
        loadChildren: './master-data/form-list-master/form-list-master.module#FormListMasterModule'
      },
      {
        path: 'master-datâ',
        loadChildren: './master-data/grid-list-master/grid-list-master.module#GridListMasterModule'
      },
      {
        path: 'master-dâta',
        loadChildren: './master-data/screen-list-master/screen-list-master.module#ScreenListMasterModule'
      },
      {
        path: 'mâster-data',
        loadChildren: './master-data/module-list-master/module-list-master.module#ModuleListMasterModule'
      },
      {
        path: 'rule-engine',
        loadChildren: './rule-engine/expression-builder/expression-builder.module#ExpressionBuilderModule'
      },
      // {
      //   path: 'test',
      //   loadChildren: './test/test.module#TestModule'
      // }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,{useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
