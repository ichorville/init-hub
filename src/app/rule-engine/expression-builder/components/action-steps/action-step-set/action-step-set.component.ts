
import { Component, OnInit } from '@angular/core';
import { ActionStepBaseComponent } from '../action-step-base/action-step-base.component';
import {RuleComponentModel} from "../../../models/rule-component.model";
import {RuleModuleScreenModel} from "../../../models/rule-module-screen.model";
import {ExpressionActionStep_SetModel} from "../../../models/exp-action-steps/expression-action-steps.model";

@Component({
	selector: 'app-action-step-set',
	templateUrl: './action-step-set.component.html',
	styleUrls: ['./action-step-set.component.css']
})
export class ActionStepSetComponent extends ActionStepBaseComponent implements OnInit {

	components: RuleComponentModel[] = [];

	constructor() {
		super();
	}

	ngOnInit() {
		const ruleModel: RuleModuleScreenModel = this.actionData.getRootParent();
		if (ruleModel) {
			this.components = ruleModel.components;
		}
	}


	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/

	private get dataModel(): ExpressionActionStep_SetModel {
		return this.actionData as ExpressionActionStep_SetModel;
	}

	get targetControl(): string {
		return this.dataModel.targetControl;
	}
	set targetControl(val: string) {
		this.dataModel.targetControl = val;
	}



	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/





	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/


}
