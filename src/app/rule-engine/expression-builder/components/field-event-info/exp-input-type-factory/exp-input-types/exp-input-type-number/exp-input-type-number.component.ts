
import { Component, OnInit } from '@angular/core';
import { ExpInputTypeBaseComponent } from '../exp-input-type-base/exp-input-type-base.component';
import {EXP_INPUT_TYPE_ENUM} from "../../../../../models/exp-input-types/exp-input-type.enum";

@Component({
	selector: 'app-exp-input-type-number',
	templateUrl: './exp-input-type-number.component.html',
	styleUrls: ['./exp-input-type-number.component.css']
})
export class ExpInputTypeNumberComponent extends ExpInputTypeBaseComponent<number> implements OnInit {

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
		return `${EXP_INPUT_TYPE_ENUM.NUMBER}|${this.inputValue}`;
	}

	/**
	 * @override
	 */
	setValue(val: string) {
		console.log('ExpInputTypeNumberComponent::setValue : ', val);

		if (val) {
			const aData = ('' + val).split('|');
			if (aData.length) {
				const type = aData[0];

				if (type === EXP_INPUT_TYPE_ENUM.NUMBER && aData.length === 2) {
					const value = aData[1];

					this.inputValueSilent = parseInt(value, 10);
				}
			}
		}
	}



	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/

}
