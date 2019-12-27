import { Component, OnInit, Input, ViewChild, TemplateRef, SimpleChanges } from '@angular/core';
import { CsiToastsService } from '@csi/csi-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css']
})
export class RadioComponent implements OnInit {

  @Input() widget:any;

  currentWidget:any;

  constructor() { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }

}
