import { FormElement } from './form-element';

export class TabularEntry extends FormElement<string> {
	headerDefinitions:any;
	constructor(options: {} = {}) {
		super(options);
		this.headerDefinitions = options['headerDefinitions'] || [];
	}
}
