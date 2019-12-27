
import { Component, OnInit } from '@angular/core';
import { ActionStepBaseComponent } from '../action-step-base/action-step-base.component';
import {ExpressionActionStep_AlertModel} from "../../../models/exp-action-steps/expression-action-steps.model";

@Component({
	selector: 'app-action-step-alert',
	templateUrl: './action-step-alert.component.html',
	styleUrls: ['./action-step-alert.component.css']
})
export class ActionStepAlertComponent extends ActionStepBaseComponent implements OnInit {

	constructor() {
		super();
	}

	ngOnInit() {

	}


	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/

	private get dataModel(): ExpressionActionStep_AlertModel {
		return this.actionData as ExpressionActionStep_AlertModel;
	}

	get params(): string {
		return this.dataModel.params;
	}
	set params(val: string) {
		this.dataModel.params = val;
	}

	get content(): string {
		return this.dataModel.content;
	}
	set content(val: string) {
		this.dataModel.content = val;
	}



	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/





	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/


}
