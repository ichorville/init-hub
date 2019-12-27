import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RuleComponentModel } from '../../models/rule-component.model';

@Component({
	selector: 'app-expb-field-selector',
	templateUrl: './expb-field-selector.component.html',
	styleUrls: ['./expb-field-selector.component.css']
})
export class EXPBFieldSelectorComponent implements OnInit {
	// @Input() sections: RuleScreenSectionModel[] = [];
	@Input() components: RuleComponentModel[] = [];
	@Output() select = new EventEmitter<RuleComponentModel>();

	searchValue = '';
	selectedField: RuleComponentModel = null;


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

	classSelectedItem(selectedItem: RuleComponentModel): string {
		if (this.selectedField && this.selectedField.componentKey === selectedItem.componentKey) {
			return 'bg-primary text-white';
		}

		return '';
	}




	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/

	onClick_Field(comp: RuleComponentModel) {
		this.selectedField = comp;

		this.select.emit(comp);
	}

}
