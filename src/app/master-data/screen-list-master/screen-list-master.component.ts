import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ScreenListMasterService } from './screen-list-master.service';

@Component({
  selector: 'app-screen-list-master',
  templateUrl: './screen-list-master.component.html',
  styleUrls: ['./screen-list-master.component.css']
})
export class ScreenListMasterComponent implements OnInit {
  columns: any[];
	rows: any[];
	title: string;

	priceLists: any[];
	loadingCompleted: boolean;
  constructor(
		private _slms: ScreenListMasterService,
		private router: Router
  ) { 
    this.loadingCompleted = false;		
		this.title = 'Price List';
		this.priceLists = [];
		this.columns = [
			{ name: 'Name', attr: 'name', type: 'string' },
      { name: 'Module', attr: 'module', type: 'string' },
      { name: 'Column Length', attr: 'colLength', type: 'string' },
      { name: 'Actions', attr: 'actions', type: 'string' },
		];
  }

  ngOnInit() {
    this.updateRows(this._slms.screenList);
  }

  private updateRows(elements) {
		this.rows = [];
		elements.forEach(element => {
      console.log(this.returnActionsString(element))
			this.rows.push({
				name: element.gridName,
        module: element.gridName,
        colLength: element.selectedFiels.length,
        actions: this.returnActionsString(element)
			});
		});
		this.loadingCompleted = true;
  }
  
  onLoad(event) {
    console.log(event);
	}
	
	add(event) {
		this.router.navigateByUrl(`/cûstomize/screens`);
	}

	update(event) {
		this.router.navigateByUrl(`/cûstomize/screens/${ event.name }`);
  }
  
  returnActionsString(element) {
    let str = '';
    element.editable == true ? str = str.concat('Edit') : '';
    element.deletable == true ? str = str.concat(' Delete') : '';
    return str;
  }
}
