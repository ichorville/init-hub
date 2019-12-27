import { Input } from '@angular/core';


export interface IExpInputTypeBase {

	// inputType: EXP_INPUT_TYPE;

	getValue(): string;
	setValue(val: string): any;

}
