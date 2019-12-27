import { FormElement } from './form-element';

export class NumberInputBox extends FormElement<string> {
    placeholder: string;
    type: string;
    minValue?: number;
    maxValue?: number;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
        this.type = options['type'] || '';
        this.minValue = options['minValue'] || '';
        this.maxValue = options['maxValue'] || '';
	}
}
