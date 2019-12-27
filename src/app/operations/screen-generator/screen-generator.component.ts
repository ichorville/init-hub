import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';

import { ScreenGeneratorService } from './screen-generator.service';
import { GridListMasterService } from '../../master-data/grid-list-master/grid-list.master.service';
import {LogUserService} from "@csi/csi-services-gateway";

@Component({
  selector: 'app-screen-generator',
  templateUrl: './screen-generator.component.html',
  styleUrls: ['./screen-generator.component.css']
})
export class ScreenGeneratorComponent implements OnInit {
  formList: any[] = [];
  gridList: any[] = [];
  widgetList: any[] = [];

  gridName: string;
  selectedFields: any[] = [];

  editable: boolean = false;
  deletable: boolean = false;

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  constructor(
    private _sgs: ScreenGeneratorService,
    private _gls: GridListMasterService,
    private route: ActivatedRoute,
    private logUserService: LogUserService
  ) { }

  ngOnInit() {
    const configuration = {
      hospitalGroupId: Number(this.logUserService.getUserHospitalGroupId()),
      hospitalId: this.logUserService.getUserHospitalId() + '',
    };
    // on page load all forms, grids and widgets have to be loaded on to the shared list respectively
    this._sgs.getFormList(configuration).subscribe(res => {
      this.formList = res;
    });

    this.gridList = this._gls.gridList;
    let param = this.route.snapshot.url[1];
    // if snapshot param is available then the form is prompt to edit
    if (param != undefined) {
      this.selectTab(1);
    }
  }

  addForm(form) {
    this._sgs.formSelectNotifierSetter(JSON.parse(decodeURI(form.definition)));
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  addGrid(event){
    console.log(event);
  }
}
