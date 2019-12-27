import { FormElement } from './form-element';

export class FormDatePicker extends FormElement<string> {
	placeholder: string;
	includeTime: boolean;
	isDateRange: boolean;
	currentDate: boolean;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
		this.includeTime = options['includeTime'] || false;
		this.isDateRange = options['isDateRange'] || false;
		this.currentDate = options['currentDate'] || false;
	}
}
