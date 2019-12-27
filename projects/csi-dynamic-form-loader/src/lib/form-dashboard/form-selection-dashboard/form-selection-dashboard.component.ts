import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormSelectionDashboardService} from "../form-selection-dashboard.service";
import {CsiDynamicFormLoaderService} from "../../csi-dynamic-form-loader.service";
import {POMR} from '@csi/csi-ehr-interfaces';
import {BsModalRef} from 'ngx-bootstrap';
import {FormLoaderModelService} from "../../form-loader-model/form-loader-model.service";
import {CsiDynamicFormComponent} from "@csi/csi-dynamic-form";

@Component({
  selector: 'csi-form-selection-dashboard',
  templateUrl: './form-selection-dashboard.component.html',
  styleUrls: ['./form-selection-dashboard.component.css']
})
export class FormSelectionDashboardComponent implements OnInit {
  formsInModule: any;
  selectedForm: any;
  previewMode: boolean = false;
  data: any;
  formId: any;
  apiContext: any;
  formName: string;
  widgets: any[];
  gridAvailable: boolean;
  saveOption: string;

  search:string = "";
  forms:any;

  @ViewChild('csiDynamicForm') csiDynamicFormComp: CsiDynamicFormComponent;

  @Input() POMR: POMR;

  constructor(public bsModalRef: BsModalRef, private formSelectionService: FormSelectionDashboardService, private dynamicFormLoaderService: CsiDynamicFormLoaderService) {
  }

  ngOnInit() {
    this.loadForms();
  }

  loadForms() {
    this.formSelectionService.getFormData('').subscribe(res => {
      res.forEach(form => {
        form.createdDateTime = form.createdDateTime ? Date.parse(form.createdDateTime) : null;
      });
      this.forms = res;
      this.formsInModule = this.forms;
    });
  }

  searchForm(e){
    if(this.forms.length>0){
      if(this.search === ""){
        this.formsInModule = this.forms;
      }else{
        this.formsInModule = this.forms.filter((form)=>{
          return form.formName.search(this.search) > -1 || form.formName == this.search;
        });
      }
    }
  }

  selectUsedForm(form) {
    this.selectedForm = form;
    this.formId = form.id;
    this.apiContext = {
      pomrId: this.POMR.patientPomrId,
      patientId: this.POMR.patientId
    };

    this.dynamicFormLoaderService.getFormById(form.id).subscribe(res => {
      this.data = res;
      const formDefinition = JSON.parse(decodeURI(this.data.definition));
      this.widgets = formDefinition.data;
      this.formName = res.fieldName;
      this.gridAvailable = formDefinition.gridAvailability;
      this.saveOption = this.data.saveOptions;
      this.csiDynamicFormComp.loadData();
    });
    // this.bsModalRef.hide();
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  showAudits() {
    this.csiDynamicFormComp.showHistory();
  }


  saveForm() {
    this.csiDynamicFormComp.onSubmit(this.csiDynamicFormComp.form);
  }

}
