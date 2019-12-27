import { FormElement } from './form-element';

export class FormDropDown extends FormElement<string> {
	options: any[];
    placeholder: string;
    allowMultiSelect: boolean;
    urlEndpoint: boolean;
    apiSource?: string;
    apiEndpoint?: string;
    displayProperty?: string;
    valueProperty?: string;
	constructor(options: {} = {}) {
		super(options);
        this.options = options['options'] || [];
        this.placeholder = options['placeholder'] || '';
        this.allowMultiSelect = options['allowMultiSelect'] || false;
        this.urlEndpoint = options['urlEndpoint'] || '';
        this.apiSource = options['apiSource'] || '';
        this.apiEndpoint = options['apiEndpoint'] || '';
        this.displayProperty = options['displayProperty'] || '';
        this.valueProperty = options['valueProperty'] || '';
	}
}