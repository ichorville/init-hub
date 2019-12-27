import { FormElement } from './form-element';

export class TextInputBox extends FormElement<string> {
    placeholder: string;
	type: string;
	characterLength?: number;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
		this.type = options['type'] || 'text';
		this.characterLength = options['characterLength'] || 0;
	}
}
