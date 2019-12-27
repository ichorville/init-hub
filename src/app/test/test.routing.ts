import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScreenTestComponent } from './screen-test/screen-test.component';
import { FormTestComponent } from './form-test/form-test.component';

const routes: Routes = [
	{ 
		path: '', 
		redirectTo: 'test', 
		pathMatch: 'full' 
	},
	{
		path: 'screens',
		component: ScreenTestComponent
	},
	{
		path: 'forms',
		component: FormTestComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TestRouting { }
