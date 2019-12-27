import {Component, Input, OnInit} from '@angular/core';
import {FormGeneratorService} from '../form-generator.service';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-field-usage',
  templateUrl: './field-usage.component.html',
  styleUrls: ['./field-usage.component.css']
})
export class FieldUsageComponent implements OnInit {
  @Input() formsUsed: any;
  selectedForm: any;

  constructor(private controlContent: FormGeneratorService, public bsModalRef: BsModalRef) {
  }

  ngOnInit() {}

  selectUsedForm(form) {
    this.selectedForm = form;
  }

  confirmUsedForm(use) {
    if (use === true) {
      this.controlContent.useFieldUsedInFormSetter(this.selectedForm);
    }
    
    this.bsModalRef.hide();
  }

}
