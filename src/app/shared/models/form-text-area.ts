import { FormElement } from './form-element';

export class TextArea extends FormElement<string> {
	placeholder: string;
	characterLength?: number;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
		this.characterLength = options['characterLength'] || 0;
	}
}
