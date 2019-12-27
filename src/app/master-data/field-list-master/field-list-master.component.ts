import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FieldListMasterService } from './field-list-master.service';

@Component({
  selector: 'app-field-list-master',
  templateUrl: './field-list-master.component.html',
  styleUrls: ['./field-list-master.component.css']
})
export class FieldListMasterComponent implements OnInit {
  columns: any[];
	rows: any[];
	title: string;

	priceLists: any[];
	loadingCompleted: boolean;
  constructor(
		private _flms: FieldListMasterService,
		private router: Router
  ) { 
    this.loadingCompleted = false;		
		this.title = 'Price List';
		this.priceLists = [];
		this.columns = [
			{ name: 'Name', attr: 'name', type: 'string' },
			{ name: 'Type', attr: 'type', type: 'string' },
			{ name: 'Module', attr: 'module', type: 'string' },
			{ name: 'Validators', attr: 'validators', type: 'string' },
		];
  }

  ngOnInit() {
    this.updateRows(this._flms.fieldList);
  }

  private updateRows(elements) {
		this.rows = [];
		elements.forEach(element => {
			this.rows.push({
				name: element.label,
				type: element.controlType,
			});
		});
		this.loadingCompleted = true;
  }
  
  onLoad(event) {
    console.log(event);
	}
	
	add(event) {
		this.router.navigateByUrl(`/customize/fields`);
	}

	update(event) {
		this.router.navigateByUrl(`/customize/fields/${ event.name }`);
	}
}
