import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'csi-dynamic-form-loader',
  templateUrl: "csi-dynamic-form-loader.component.html",
  styleUrls: [
    'csi-dynamic-form-loader.component.scss'
  ]
})
export class CsiDynamicFormLoaderComponent implements OnInit {
  data: any;
  widgets: any;
  formName: any;

  constructor( ) { }

  ngOnInit() {

  }
}
