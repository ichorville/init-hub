import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit, OnChanges {

  @Input() widget:any;
  @Input() exclude:any[] = [];

  currentWidget:any;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }

  onLabelChanged(value){
    this.currentWidget.key = value;
    this.widget.title = value;
  }

  checkVisibility(name){
    if(this.exclude.indexOf(name) === -1) return true;
    return false;
  }
}
