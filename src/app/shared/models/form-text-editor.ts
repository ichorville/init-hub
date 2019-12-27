import { FormElement } from './form-element';

export class TextEditor extends FormElement<string> {
    placeholder: string;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
	}
}
