import { FormElement } from './form-element';

export class FormLogo extends FormElement<string> {
	formLogoUrl:string;
	imageWidth:number;
	imageHeight:number;
	image?:string;

	constructor(options: {} = {}) {
		super(options);
		this.formLogoUrl = options['formLogoUrl'] || '';
		this.imageWidth = options['imageWidth'] || '';
		this.imageHeight = options['imageHeight'] || '';
		this.image = options['image'] || '';
	}
}
