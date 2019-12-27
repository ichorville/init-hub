import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
@Component({
  selector: 'app-form-preview',
  templateUrl: './form-preview.component.html',
  styleUrls: ['./form-preview.component.css']
})
export class FormPreviewComponent implements OnInit {
  previewMode: boolean = true;
  loaded: boolean = false;
  formData: any;
  bsModalRef: BsModalRef;
  constructor() { }

  ngOnInit() {
    console.log("sss");
  }

  popupInit(event, data) {
    this.bsModalRef = event;
    this.formData = data;
    this.loaded = true;
  }
}
