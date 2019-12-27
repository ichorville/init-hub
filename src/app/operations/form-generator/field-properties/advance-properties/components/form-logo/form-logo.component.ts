import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-form-logo',
  templateUrl: './form-logo.component.html',
  styleUrls: ['./form-logo.component.css']
})
export class FormLogoComponent implements OnInit {

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
