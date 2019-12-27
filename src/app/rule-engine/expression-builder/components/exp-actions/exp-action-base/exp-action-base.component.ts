
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { IExpActionBase } from './exp-action-base.interface';
import {EventExpressionActionModel} from "../../../models/event-expression-action.model";

@Component({
	selector: 'app-exp-action-base',
	templateUrl: './exp-action-base.component.html',
	styleUrls: ['./exp-action-base.component.css']
})
export class ExpActionBaseComponent implements OnInit, IExpActionBase {

	@Input() actionData: EventExpressionActionModel = null;

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
