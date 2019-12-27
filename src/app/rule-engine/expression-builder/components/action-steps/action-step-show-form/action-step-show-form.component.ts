
import { Component, OnInit } from '@angular/core';
import { ActionStepBaseComponent } from '../action-step-base/action-step-base.component';
import {RuleModuleScreenModel} from "../../../models/rule-module-screen.model";
import {ExpressionActionStep_ShowFormModel} from "../../../models/exp-action-steps/expression-action-steps.model";
import {ExpressionBuilderService} from "../../../expression-builder.service";

@Component({
	selector: 'app-action-step-show-form',
	templateUrl: './action-step-show-form.component.html',
	styleUrls: ['./action-step-show-form.component.css']
})
export class ActionStepShowFormComponent extends ActionStepBaseComponent implements OnInit {

	screens: any[] = [];

	constructor( private expressionBuilderService: ExpressionBuilderService ) {
		super();
	}

	ngOnInit() {
		const ruleModel: RuleModuleScreenModel = this.actionData.getRootParent();
		if (ruleModel) {
			this.loadScreens();
		}
	}


	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/

  loadScreens() {
    this.expressionBuilderService.getScreensByModule("CUSTOM_FORMS")
      .subscribe(
        (data) => {
          if (data) {
            this.screens = data;
          }
        },
        (error) => {
          alert(error);
        }
      );
  }

	private get dataModel(): ExpressionActionStep_ShowFormModel {
		return this.actionData as ExpressionActionStep_ShowFormModel;
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
