import { FormElement } from './form-element';

export class FormTImePicker extends FormElement<string> {
	
	currentTime:boolean;

	constructor(options: {} = {}) {
		super(options);
		this.currentTime = options['currentTime'] || false;
	}
}
