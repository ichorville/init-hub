import { Component, OnInit ,Input
} from '@angular/core';
import {  BsModalService, BsModalRef , ModalOptions} from 'ngx-bootstrap';
import {FormSelectionDashboardComponent} from "../form-selection-dashboard/form-selection-dashboard.component";
import {POMR} from '@csi/csi-ehr-interfaces';

@Component({
  selector: 'csi-form-selection-fab',
  templateUrl: './form-selection-fab.component.html',
  styleUrls: ['./form-selection-fab.component.css']
})
export class FormSelectionFabComponent implements OnInit {

  @Input() POMR: POMR;

  constructor(private bsModalService: BsModalService) { }
  

  ngOnInit() {}

  loadFormDashBoard() {
    const modal: ModalOptions = new ModalOptions();
    modal.class = 'dynamicForm__modal';
    modal.initialState = {
      POMR: this.POMR
    };
    this.bsModalService.show(FormSelectionDashboardComponent, modal);
  }

}
