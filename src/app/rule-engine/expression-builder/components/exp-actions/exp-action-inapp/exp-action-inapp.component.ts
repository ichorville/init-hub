
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ExpActionBaseComponent } from '../exp-action-base/exp-action-base.component';
import { EventExpressionAction_InAppModel } from '../../../models/event-expression-action.model';
import { EVENT_ACTION_STEP_TYPE } from '../../../services/dtd/expression-builder.dtd';

@Component({
	selector: 'app-exp-action-inapp',
	templateUrl: './exp-action-inapp.component.html',
	styleUrls: ['./exp-action-inapp.component.css']
})
export class ExpActionInAppComponent extends ExpActionBaseComponent implements OnInit {
	/**
	 * @override
	 */
	@Input() actionData: EventExpressionAction_InAppModel = null;

	selectedNewActionStepKey = '-1';

	constructor() {
		super();
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
	onClick_AddActionStep(event) {
		this.actionData.addActionStep(this.selectedNewActionStepKey as EVENT_ACTION_STEP_TYPE);
	}

}
