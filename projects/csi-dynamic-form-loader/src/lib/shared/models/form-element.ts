export class FormElement<T> {
	value: T;
	key: string;
	label: string;
	required: boolean;
	disabled?: boolean
	controlType: string;
	validators: any[];
	errors: string[];	
	theme: string;
	constructor(options: {
		value?: T,
		key?: string,
		label?: string,
		required?: boolean,
		disabled?: boolean,
		controlType?: string,
		validators?: any[],
		theme?: string
	} = {}) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.required = !!options.required;
		this.disabled = options.disabled || false;
		this.controlType = options.controlType || '';
		this.validators = options.validators || [];
		this.errors = [];
		this.theme = options.theme || 'bootstrap'
	}
}
