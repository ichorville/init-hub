import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';

import { FieldListMasterService } from '../../master-data/field-list-master/field-list-master.service';
import { GridGeneratorService } from './grid-generator.service';
import {LogUserService} from "@csi/csi-services-gateway";

@Component({
  selector: 'app-grid-generator',
  templateUrl: './grid-generator.component.html',
  styleUrls: ['./grid-generator.component.css']
})
export class GridGeneratorComponent implements OnInit {
  fieldList: any[] = [];
  gridList: any[] = [];

  gridName: string;
  selectedFields: any[] = [];

  editable: boolean = false;
  deletable: boolean = false;

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(
    private _flms: FieldListMasterService,
    private _ggs: GridGeneratorService,
    private route: ActivatedRoute,
    private logUserService: LogUserService
  ) { }

  ngOnInit() {
    const configuration = {
      hospitalGroupId: Number(this.logUserService.getUserHospitalGroupId()),
      hospitalId: this.logUserService.getUserHospitalId() + '',
		};
    // on page load all fields, grids and forms have to be loaded on to the shared list respectively
    this._ggs.getFieldList(configuration).subscribe(res => {
      // this.fieldList = res;
      this.fieldList = this._flms.fieldList;
    });

    this.gridList = this._ggs.gridList;
    let param = this.route.snapshot.url[1];
      // if snapshot param is available then the form is prompt to edit
      if (param != undefined) {
        this.selectTab(1);
        // retireve current from meta-data params
        // let form = this.gridList.filter(element => element.id === param.path)[0];
        let form = this.gridList.filter(element => element.gridName === 'Active Ingredients')[0];
        this.gridName = form.gridName;
        form.selectedFiels.forEach(element => this.selectedFields.push({ label: element, value: element }));
      }
  }

  addField(field) {
    this.selectedFields.filter(element => element.key === field.key).length == 0 ?
      this.selectedFields.push(field)
        : ''
  }

  removeField(field) {
    this.selectedFields = this.selectedFields.filter(element => element.key != field.key);
  }

  save() {
    if (this.selectedFields.length == 0) {
      return;
    }
    let gridOptions = {
      gridName: this.gridName,
      selectedFiels: this.returnSelectedFieldKeys(),
      editable: this.editable,
      deletable: this.deletable
    };
    console.log(JSON.stringify(gridOptions))
    this._ggs.gridList.push(gridOptions);
  }

  returnSelectedFieldKeys() {
    let keys = [];
    this.selectedFields.forEach(element => keys.push(element.key));
    return keys;
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  addGrid(event){
    console.log(event);
  }
}
