import { FormElement } from './form-element';

export class FormCheckBox extends FormElement<string> {
	options: any[];
	urlEndpoint: boolean;
	apiEndpoint?: string;
	displayProperty?: string;
	valueProperty?: string;
	inlineField?: boolean;

	constructor(options: {} = {}) {
		super(options);
		this.options = options['options'] || [];
		this.urlEndpoint = options['urlEndpoint'] || '';
		this.apiEndpoint = options['apiEndpoint'] || '';
		this.displayProperty = options['displayProperty'] || '';
		this.valueProperty = options['valueProperty'] || '';
		this.inlineField =  options['inlineField'] || false;
	}
}