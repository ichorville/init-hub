
import { Component, OnInit } from '@angular/core';
import { ExpInputTypeBaseComponent } from '../exp-input-type-base/exp-input-type-base.component';
import {EXP_INPUT_TYPE_ENUM} from "../../../../../models/exp-input-types/exp-input-type.enum";
import {RuleComponentModel} from "../../../../../models/rule-component.model";

@Component({
	selector: 'app-exp-input-type-field',
	templateUrl: './exp-input-type-field.component.html',
	styleUrls: ['./exp-input-type-field.component.css']
})
export class ExpInputTypeFieldComponent extends ExpInputTypeBaseComponent<string> implements OnInit {

	fields: RuleComponentModel[] = [];


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

	/**
	 * @override
	 */
	getValue(): string {
		return `${EXP_INPUT_TYPE_ENUM.FIELD}|${this.inputValue}`;
	}

	/**
	 * @override
	 */
	setValue(val: string) {
		console.log('ExpInputTypeFieldComponent::setValue : ', val);

		if (val) {
			const aData = ('' + val).split('|');
			if (aData.length) {
				const type = aData[0];

				if (type === EXP_INPUT_TYPE_ENUM.FIELD && aData.length === 2) {
					const value = aData[1];

					this.inputValueSilent = value;
				}
			}
		}
	}



	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/

	onChange_Field(event) {

	}

}
