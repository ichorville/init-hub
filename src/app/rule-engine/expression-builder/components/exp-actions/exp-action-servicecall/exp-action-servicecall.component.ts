
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ExpActionBaseComponent } from '../exp-action-base/exp-action-base.component';
import {EventExpressionAction_ServiceCallModel} from "../../../models/event-expression-action.model";

@Component({
	selector: 'app-exp-action-servicecall',
	templateUrl: './exp-action-servicecall.component.html',
	styleUrls: ['./exp-action-servicecall.component.css']
})
export class ExpActionServiceCallComponent extends ExpActionBaseComponent implements OnInit {

	constructor() {
		super();
	}

	ngOnInit() {

	}


	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/

	private get dataModel(): EventExpressionAction_ServiceCallModel {
		return this.actionData as EventExpressionAction_ServiceCallModel;
	}

	get parameters(): string {
		return this.dataModel.parameters;
	}
	set parameters(val: string) {
		this.dataModel.parameters = val;
	}

	get endPoint(): string {
		return this.dataModel.endPoint;
	}
	set endPoint(val: string) {
		this.dataModel.endPoint = val;
	}



	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/





	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/


}
