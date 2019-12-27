
import { Component, OnInit } from '@angular/core';
import { ActionStepBaseComponent } from '../action-step-base/action-step-base.component';
import {RuleComponentModel} from "../../../models/rule-component.model";
import {RuleModuleScreenModel} from "../../../models/rule-module-screen.model";
import {ExpressionActionStep_DisableModel} from "../../../models/exp-action-steps/expression-action-steps.model";

@Component({
	selector: 'app-action-step-disable',
	templateUrl: './action-step-disable.component.html',
	styleUrls: ['./action-step-disable.component.css']
})
export class ActionStepDisableComponent extends ActionStepBaseComponent implements OnInit {

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

	private get dataModel(): ExpressionActionStep_DisableModel {
		return this.actionData as ExpressionActionStep_DisableModel;
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
