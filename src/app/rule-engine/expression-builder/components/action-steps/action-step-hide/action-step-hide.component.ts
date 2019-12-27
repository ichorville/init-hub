
import { Component, OnInit } from '@angular/core';
import { ActionStepBaseComponent } from '../action-step-base/action-step-base.component';
import {RuleComponentModel} from "../../../models/rule-component.model";
import {RuleModuleScreenModel} from "../../../models/rule-module-screen.model";
import {ExpressionActionStep_HideModel} from "../../../models/exp-action-steps/expression-action-steps.model";

@Component({
	selector: 'app-action-step-hide',
	templateUrl: './action-step-hide.component.html',
	styleUrls: ['./action-step-hide.component.css']
})
export class ActionStepHideComponent extends ActionStepBaseComponent implements OnInit {

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

	private get dataModel(): ExpressionActionStep_HideModel {
		return this.actionData as ExpressionActionStep_HideModel;
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
