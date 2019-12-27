import { FormElement } from './form-element';

export class TextRangeBox extends FormElement<string> {
    placeholder: string;
    type: string;
    minValue?: number;
    maxValue?: number;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
        this.type = options['type'] || 'range';
        this.minValue = options['minValue'] || '';
        this.maxValue = options['maxValue'] || '';
	}
}
