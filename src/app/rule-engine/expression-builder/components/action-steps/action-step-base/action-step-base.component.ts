
import { Component, OnInit, Input } from '@angular/core';
import { IActionStepBase } from './action-step-base.interface';
import { ExpressionActionStepModel } from '../../../models/expression-action-step.model';

@Component({
	selector: 'app-action-step-base',
	templateUrl: './action-step-base.component.html',
	styleUrls: ['./action-step-base.component.css']
})
export class ActionStepBaseComponent implements OnInit, IActionStepBase {

	@Input() actionData: ExpressionActionStepModel = null;

	constructor() {

	}

	ngOnInit() {

	}


	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/




	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/




	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/


}
