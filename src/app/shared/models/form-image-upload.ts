import { FormElement } from './form-element';

export class ImageUpload extends FormElement<string> {
	placeholder: string;
	imageWidth: number;
	imageHeight:number;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
		this.imageWidth = options['imageWidth'] || 100;
		this.imageHeight = options['imageHeight'] || 100;
	}
}
