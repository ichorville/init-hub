import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormListMasterService } from './form-list-master.service';
import {LogUserService} from "@csi/csi-services-gateway";

@Component({
	selector: 'app-form-list-master',
	templateUrl: './form-list-master.component.html',
	styleUrls: ['./form-list-master.component.css']
})
export class FormListMasterComponent implements OnInit {
	columns: any[];
	rows: any[];
	title: string;
	filteredRows: any[];
	searchTerms: any[];
	formList: any[];
	loadingCompleted: boolean;
	constructor(
		private _flms: FormListMasterService,
		private router: Router,
    private logUserService: LogUserService
	) {
		this.loadingCompleted = false;
		this.title = 'Price List';
		this.formList = [];
		this.columns = [
			{ name: 'Name', attr: 'name', type: 'string' },
			{ name: 'Category', attr: 'category', type: 'string' },
			{ name: 'Modules', attr: 'modules', type: 'string' }
		];
	}

	ngOnInit() {
    	const configuration = {
			hospitalGroupId: Number(this.logUserService.getUserHospitalGroupId()),
			hospitalId: this.logUserService.getUserHospitalId() + '',
			applicationId: "EHR",
			searchTerm:""
		};
		this._flms.getFormList(configuration).subscribe(res => {
			this.formList = res;
			this.searchTerms = res;
			this.filteredRows = res;
			this.updateRows(this.formList);
		});
	}

	private updateRows(elements) {
		this.rows = [];
		elements.forEach(element => {
			this.rows.push({
				id: element.id,
				name: element.formName,
				category: element.category,
				modules: element.applicableApplications
			});
		});
		this.loadingCompleted = true;
	}

	onLoad(event) {

	}

	add(event) {
		this.router.navigateByUrl(`/customizè/forms`);
	}

	update(event) {
		this.router.navigateByUrl(`/customizè/forms/${event.id}`);
	}

	delete(event) {
		this._flms.removeForm(event.id).subscribe(res => {
      const configuration = {
        hospitalGroupId: Number(this.logUserService.getUserHospitalGroupId()),
        hospitalId: this.logUserService.getUserHospitalId() + '',
			};
			this._flms.getFormList(configuration).subscribe(res => {
				this.formList = res;
				this.searchTerms = res;
				this.filteredRows = res;
				this.updateRows(this.formList);
			});
		});
	}

	searchResult(event) {
		if (event == 'NDF') {
			this.formList = [];
		} else if (event.length == 0) {
			this.formList = this.filteredRows;
		} else {
			this.formList = event;
		}
		this.updateRows(this.formList)
	}
}
