import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventExpressionActionModel } from '../../models/event-expression-action.model';

@Component({
	selector: 'app-expb-action-selector',
	templateUrl: './expb-action-selector.component.html',
	styleUrls: ['./expb-action-selector.component.css']
})
export class EXPBActionSelectorComponent implements OnInit {
	@Input() actions: EventExpressionActionModel[] = [];
	@Output() select = new EventEmitter<EventExpressionActionModel>();

	searchValue = '';
	selectedIndex = -1;
	selectedAction: EventExpressionActionModel = null;


	constructor(
	) {

	}

	ngOnInit() {
	}


	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/




	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/

	alert(message) {
		alert(message);
		// this._csiAlertService.success('Message', message, 'OK', 'btn');
	}

	alertError(message) {
		alert(message);
		// this._csiAlertService.success('Error', message, 'OK', 'btn');
	}

	confirm(message) {

	}

	classSelectedItem(index: number, selectedItem: EventExpressionActionModel): string {
		if (index === this.selectedIndex) {
			return 'bg-primary text-white';
		}

		return '';
	}




	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/

	onClick_Action(index: number, action: EventExpressionActionModel) {
		this.selectedIndex = index;
		this.selectedAction = action;

		this.select.emit(action);
	}

}
