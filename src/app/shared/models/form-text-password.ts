import { FormElement } from './form-element';

export class TextPassword extends FormElement<string> {
	placeholder: string;
	characterLength?: number;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
		this.characterLength = options['characterLength'] || 0;
	}
}
