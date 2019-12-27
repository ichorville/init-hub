import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpressionBuilderComponent } from './expression-builder.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: '/rule-engine',
      pathMatch: 'full'
    },
    {
        path: 'expression-builder',
        component: ExpressionBuilderComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpressionBuilderRouting { }
