import { Component, OnInit } from '@angular/core';
//import { CsiBaseLibraryComponent } from '@csi/csi-base-library-version2';
import { TestService } from '../test.service';
import {LogUserService} from "@csi/csi-services-gateway";

@Component({
  selector: 'app-form-test',
  templateUrl: './form-test.component.html',
  styleUrls: ['./form-test.component.css']
})
export class FormTestComponent implements OnInit {
  formList: any[] = [];
  formData: any = {};
  form: any;
  previewMode: boolean = false;
  gridAvailability: boolean;
  loaded: boolean = false;
  constructor(
    private _ts: TestService,
    private logUserService: LogUserService
  ) {
   // super();
  }

  ngOnInit() {
   /* this.apiContext = {
      patientId: '19518',
      pomrId: '25444'
    };*/
    const configuration = {
      hospitalGroupId: Number(this.logUserService.getUserHospitalGroupId()),
      hospitalId: this.logUserService.getUserHospitalId() + '',
    };
    this._ts.getFormList(configuration).subscribe(res => {
      this.formList = res;
    });
  }

  displayForm(form) {
    this.loaded = false;
    this.form = form;
    this.formData = JSON.parse(decodeURI(form.definition));
    this.loaded = true;
  }
}
