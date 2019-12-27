import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ModuleListMasterService {
	public moduleList: any[] = [];

	constructor() {
		this.moduleList = [
		
		];
	}
}