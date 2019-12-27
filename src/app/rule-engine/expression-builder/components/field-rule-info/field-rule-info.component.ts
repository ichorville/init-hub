import { Component, OnInit, Input } from '@angular/core';
import { RuleComponentModel } from '../../models/rule-component.model';
import { ComponentEventExpressionModel } from '../../models/component-event-expression.model';

@Component({
	selector: 'app-field-rule-info',
	templateUrl: './field-rule-info.component.html',
	styleUrls: ['./field-rule-info.component.css']
})
export class FieldRuleInfoComponent implements OnInit {
	@Input() fieldComponent: RuleComponentModel = null;

	selectedEventKey = '-1';

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

	getEventExpressionModel(eventKey): ComponentEventExpressionModel {
		if (eventKey) {
			return this.fieldComponent.getEventExpressionModel(eventKey);
		}

		return null;
	}



	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/

	onClick_AddEventExp(event) {
		if (this.selectedEventKey === '-1') {
			this.alert('Please select an event.');
			return;
		}

		this.fieldComponent.addEventExpression(this.selectedEventKey);
		console.log(this.fieldComponent.rules)
		// this.field
	}

	// onClick_Save(event) {
	// 	// this.fieldComponent.printJosn();
	// }

}
