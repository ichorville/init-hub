import { FormElement } from './form-element';

export class Image extends FormElement<string> {
	placeholder: string;
	imageUrl:string;
	image:string;
	imageHeight:number;
	imageWidth:number;
	constructor(options: {} = {}) {
		super(options);
		this.placeholder = options['placeholder'] || '';
		this.imageUrl = options['imageUrl'] || '';
		this.image = options['image'] || '';
		this.imageHeight = options['imageHeight'] || '';
		this.imageWidth = options['imageWidth'] || '';
	}
}
