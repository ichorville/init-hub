import { Component, OnInit, TemplateRef } from '@angular/core';
// import { CsiDynamicFormLoaderService } from '@csi/csi-dynamic-form-loader';
import { CsiDynamicFormLoaderService } from '../../../projects/csi-dynamic-form-loader/src/public-api';
import { POMR } from '@csi/csi-ehr-interfaces';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { FormGeneratorService } from '../operations/form-generator/form-generator.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [CsiDynamicFormLoaderService]
})
export class DashboardComponent implements OnInit {

  formId: string;
  POMR: POMR;

  modalRef: BsModalRef;

  constructor(
    private dynamicFormLoaderService: CsiDynamicFormLoaderService, 
    private bsModalService:BsModalService,
    public _fgs:FormGeneratorService,
    private router:Router) {
    this.formId = "5d67e28382bd850001cee9a1";
  }

  ngOnInit(): void {
    this.POMR = new POMR();
    this.POMR.patientId = 15653;
    this.POMR.patientPomrId = 20233;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  showFormLoaderModel() {
    // this.dynamicFormLoaderService.loadForm(this.formId, {
    //   patientId: 15653,
    //   pomrId: 20233
    // });

    this.dynamicFormLoaderService.loadForm(this.formId, {
      pomrId: 131,
      patientId: 222
    });

    // pomrId: 290,
    //   patientId: 123

  }

  createForm(){
    this.modalRef.hide();
    this._fgs.formCreatedByModal = true;
    this.router.navigate(['/customizè/forms']);
  }

  showCreateFormModal(modal:TemplateRef<any>){
    this.modalRef = this.bsModalService.show(modal);
  }

  onSaveOptionChanged(event){
		this._fgs.formSaveOption = event.target.value;
	}
}
