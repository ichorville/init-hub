
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IExpInputTypeBase } from './exp-input-type-base.interface';

// @Component({
// 	selector: 'app-exp-input-type-base',
// 	templateUrl: './exp-input-type-base.component.html',
// 	styleUrls: ['./exp-input-type-base.component.css']
// })
export abstract class ExpInputTypeBaseComponent<T> implements OnInit, IExpInputTypeBase {

	// @Input() inputType: EXP_INPUT_TYPE = null;

	private _inputValue: T;
	@Output() inputValueChange = new EventEmitter<any>();
	@Output() valueChange = new EventEmitter<any>();

	constructor() {

	}

	ngOnInit() {

	}


	/* ***********************************************************
	*** PROPERTY GETTER/SETTERS
	*************************************************************/

	get inputValue(): T {
		return this._inputValue;
	}

	@Input()
	set inputValue(val: T) {
		this._inputValue = val;

		this.inputValueChange.emit(val);
		this.valueChange.emit(this.getValue());
	}

	protected set inputValueSilent(val: T) {
		this._inputValue = val;

		// this.inputValueChange.emit(val);
		// this.valueChange.emit(this.getValue());
	}



	/* **************************************************************************************************************
	*** METHODS
	****************************************************************************************************************/

	/**
	 * FORMAT: Type|Value
	 *
	 * @override
	 */
	abstract getValue(): string;

	/**
	 * @override
	 */
	abstract setValue(val: string): any;


	/* **************************************************************************************************************
	*** EVENTS
	****************************************************************************************************************/


}
