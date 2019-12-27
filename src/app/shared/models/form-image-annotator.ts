import { FormElement } from './form-element';

export class ImageAnnotator extends FormElement<string> {
	placeholder: string;
	imageWidth: number;
	imageHeight:number;
	image:string;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
		this.imageWidth = options['imageWidth'] || 100;
		this.imageHeight = options['imageHeight'] || 100;
		this.image = options['image'] || '';
	}
}
