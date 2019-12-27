import { FormElement } from './form-element';

export class TextUrl extends FormElement<string> {
	placeholder: string;
	errorMessage: string;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
		this.errorMessage = options['errorMessage'] || '';
	}
}
