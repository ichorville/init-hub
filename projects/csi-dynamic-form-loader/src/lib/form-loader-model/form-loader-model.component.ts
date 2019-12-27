import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

import { FormLoaderModelService } from './form-loader-model.service';
import { CsiDynamicFormComponent } from '@csi/csi-dynamic-form';

@Component({
  selector: 'csi-form-loader-model',
  templateUrl: './form-loader-model.component.html',
  styleUrls: ['./form-loader-model.component.scss'],
  providers: [FormLoaderModelService]
})
export class FormLoaderModelComponent implements OnInit {
  previewMode: boolean = false;
  data: any;
  formId: any;
  apiContext: any;
  formName: string;
  widgets: any[];
  gridAvailable:boolean;
  saveOption: string;

  @ViewChild('csiDynamicForm') csiDynamicFormComp:CsiDynamicFormComponent;

  constructor(
    private dynamicFormLoaderService: FormLoaderModelService,
    private bsModelRef: BsModalRef
  ) { }

  ngOnInit() {
    this.dynamicFormLoaderService.getFormById(this.formId).subscribe(res => {
      this.data = res;
      const formDefinition = JSON.parse(decodeURI(this.data.definition));
      this.widgets = formDefinition.data;
      this.formName = formDefinition.name;
      this.gridAvailable = formDefinition.gridAvailability;
      this.saveOption = this.data.saveOptions;
    });
  }

  closeModal() {
    this.bsModelRef.hide();
  }

  showAudits(){
    this.csiDynamicFormComp.showHistory();
  }

  saveForm(){
    this.csiDynamicFormComp.onSubmit(this.csiDynamicFormComp.form);
  }
}
