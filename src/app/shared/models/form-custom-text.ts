import { FormElement } from './form-element';

export class CustomText extends FormElement<string> {
    customTextBody: string;
	constructor(options: {} = {}) {
		super(options);
		this.customTextBody = options['customTextBody'] || '';
	}
}
