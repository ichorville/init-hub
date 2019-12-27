import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TabsetComponent, BsModalService, BsModalRef } from 'ngx-bootstrap';

import { GridListMasterService } from '../../master-data/grid-list-master/grid-list.master.service';
import { FormGeneratorService } from './form-generator.service';
import { WIDGETS } from '../../shared/constants/widgets';

import { FormSettingsComponent } from './form-settings/form-settings.component';
import {LogUserService} from "@csi/csi-services-gateway";
import { FormFieldPropertiesComponent } from './form-field-properties/form-field-properties.component';
import { FormMetaDataComponent } from './form-meta-data/form-meta-data.component';
import { FieldMetaDataComponent } from './form-meta-data/field-meta-data/field-meta-data.component';
import { MatDrawer } from '@angular/material';
import { FieldGridComponent } from './field-grid/field-grid.component';
import { FieldGeneratorService } from '../field-generator/field-generator.service';

@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.scss']
})
export class FormGeneratorComponent implements OnInit {
  fieldList: any[] = [];
  gridList: any[] = [];
  formList: any[] = [];
  bsModalRef: BsModalRef;
  isFirstOpen: boolean = true;
  customClass = 'pers-fb-acc-header';
  // to narrow down search types
  searchSpecifics: string;
  widgetList: any = [];
  uiComponentList: any = [
    { key: 'card', value: 'Card' },
    { key: 'tab', value: 'Tab Set' }
  ];

  hideToolPane:boolean = false;

  expandSidbarMore:boolean = false;
  selectedFieldType:string;

  isDesignView:boolean = true;

  @ViewChild('staticTabs') staticTabs: TabsetComponent;
  @ViewChild('toolsBar') toolsBar: MatDrawer;
  @ViewChild('propsBar') propsBar: MatDrawer;
  @ViewChild('appFieldGridComp') fieldGridComp:FieldGridComponent;
  @ViewChild('fieldPropertiesComp') fieldPropertiesComp:FormFieldPropertiesComponent;
  @ViewChild('fieldMetaDataComp') fieldMetaDataComponent:FieldMetaDataComponent;

  configuration:any;

  constructor(
    public _fgs: FormGeneratorService,
    private _fegs:FieldGeneratorService,
    private _glms: GridListMasterService,
    private route: ActivatedRoute,
    private logUserService: LogUserService,
    private BsModalService: BsModalService,
  ) {}

  ngOnInit() {
    this.removeAll(this._fgs.formCreatedByModal);

    this.configuration = {
      hospitalGroupId: Number(this.logUserService.getUserHospitalGroupId()),
      hospitalId: this.logUserService.getUserHospitalId() + '',
    };
    // on page load all fields, grids and forms have to be loaded on to the shared list respectively
    this.loadFields();

    this._fgs.getFormList(this.configuration).subscribe(res => {
      console.log(res)
      this.formList = res;

      let param = this.route.snapshot.url[1];
      // if snapshot param is available then the form is prompt to edit
      if (param !== undefined) {
        // retireve current from meta-data params
        let form = this.formList.filter(element => element.id === param.path)[0];
        // append form general properties
        this._fgs.formName = form.fieldName;
        this._fgs.formModules = form.applicableApplications;
        this._fgs.formCategory = form.category;
        this._fgs.formSaveOption = form.saveOptions;
        this._fgs.gridAvailability = JSON.parse(decodeURI(form.definition)).gridAvailability;
        this._fgs.addFormInlineSetter(JSON.parse(decodeURI(form.definition)));

        // retireve rule JSON if available
        this._fgs.updateRuleJson(param);
      } else {
        this._fgs.widgets = [];
      }
    });
    this.gridList = this._glms.gridList;
    this.widgetList = WIDGETS;

    // this.lefttNav.toggle();

    this._fgs.hideFieldMetaData.subscribe(res => {
      if(res) {
        this.propsBar.close()
      }else{
        this.propsBar.open()
      }
    })

    // On resource dropdown changed changing sidebar widths
    this._fgs.onDropdownResourceSelected.subscribe(res=>{
      if(res){
        this.expandSidbarMore = true;
        this.toolsBar.close();
      }else{
        this.expandSidbarMore = false;
        this.toolsBar.open();
      }
    })

    this._fegs.addNotifyGetter().subscribe(res=>{
      this.loadFields();
    })
  }

  addField(field) {
    field['isNewField'] = false;
    this._fgs.addFieldSetter(field);
  }

  addGrid(grid) {
    console.log("ss");
    this._fgs.addGridSetter(grid);
  }

  addForm(form) {
    this._fgs.addFormSetter(form);
  }

  selectTab(tabId: number) {
    this.staticTabs.tabs[tabId].active = true;
  }

  addWidget(widget) {
    this._fgs.addWidgetSetter(widget);
  }

  viewGrid() {
    this._fgs.gridViewSetter(true);
  }

  removeAll(formCreatedByModal:boolean = false) {
    this._fgs.widgets = [];

    if(!formCreatedByModal){
      this._fgs.formName = undefined;
      this._fgs.formCategory = undefined;
      this._fgs.formModules = undefined;
      this._fgs.formSaveOption = undefined;
    }

    this._fgs.formCreatedByModal = false;

    this._fgs.formLoadedForEdit = undefined;

    this._fgs.resetMetaDataUpdateSetter(true);
    // this.fieldPropertiesComp.onReset();
    this._fgs.ruleComponents = [];
    this.propsBar.close();

    this._fgs.onGridReset.emit(true);
  }

  showPreview() {
    this.fieldGridComp.showPreview();
  }

  preSave() {
    this.fieldGridComp.preSave();
    // this._fgs.saveFormSetter(true);
  }

  openSettings() {
    this.bsModalRef = this.BsModalService.show(FormSettingsComponent, {
      class: 'pers-form-settings-modal',
      ignoreBackdropClick: true
    });
    this.bsModalRef.content.bsModalRef = this.bsModalRef;
  }

  reload() {
    this._fgs.reloadGridsterConfigSetter(true);
  }

  // openRightNav(event) {
  //   if (this.rightNav.opened == false) {
  //     this.rightNav.toggle();
  //     this.reload();
  //   }
  // }

  // closeRightNav(event) {
  //   if (this.rightNav.opened == true) {
  //     this.rightNav.toggle();
  //     this.reload();
  //   }
  // }

  togglePane(){
    this.hideToolPane = !this.hideToolPane;
  }

  onFieldClicked(field){
    field["isNewField"] = true;
    this._fgs.addFieldSetter(field);
    this.propsBar.open();
  }

  onFieldRemoved(event){
    // this.fieldPropertiesComp.onReset();
    this._fgs.hideFieldMetaData.emit(true);
    this._fgs.onFieldRemoved.emit(event);
    this.propsBar.close()
  }

  toggleTools(){
    if(this.toolsBar.opened){
      this.toolsBar.close()
    }else{
      this.toolsBar.open()
    }
  }

  toggleProps(){
    if(this.propsBar.opened){
      this.propsBar.close()
    }else{
      this.propsBar.open()
    }
  }

  sideBarStateChanged(){
    this.fieldGridComp.reloadGrid();
  }

  onWidgetClicked(event){
    this._fgs.loadFieldAttributes.emit({
      index:event.index,
      widget:event.widget
    })
  }

  loadFields(){
    this._fgs.getFieldList(this.configuration).subscribe(res => {
      let generatedFields = res;
      // this.fieldList = this._flms.fieldList;
      this.fieldList = generatedFields;
    });

  }
  addUIElement(event) {
    // this._fgs.addUIComponentSetter(event);
  } 
}
