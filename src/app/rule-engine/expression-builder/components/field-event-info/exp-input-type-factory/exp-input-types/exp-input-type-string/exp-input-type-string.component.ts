
import { Component, OnInit } from '@angular/core';
import { ExpInputTypeBaseComponent } from '../exp-input-type-base/exp-input-type-base.component';
import {EXP_INPUT_TYPE_ENUM} from "../../../../../models/exp-input-types/exp-input-type.enum";

@Component({
	selector: 'app-exp-input-type-string',
	templateUrl: './exp-input-type-string.component.html',
	styleUrls: ['./exp-input-type-string.component.css']
})
export class ExpInputTypeStringComponent extends ExpInputTypeBaseComponent<string> implements OnInit {

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
		return `${EXP_INPUT_TYPE_ENUM.STRING}|${this.inputValue}`;
	}

	/**
	 * @override
	 */
	setValue(val: string) {
		console.log('ExpInputTypeStringComponent::setValue : ', val);

		if (val) {
			const aData = ('' + val).split('|');
			if (aData.length) {
				const type = aData[0];

				if (type === EXP_INPUT_TYPE_ENUM.STRING && aData.length === 2) {
					const value = aData[1];

					this.inputValueSilent = value;
				}
			}
		}
	}



	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/

}
