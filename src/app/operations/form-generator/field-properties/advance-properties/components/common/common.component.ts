import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.css']
})
export class CommonComponent implements OnInit {

  @Input() widget:any;
  @Input() exclude:any[] = [];

  currentWidget:any;

  constructor() { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }

  checkVisibility(name){
    if(this.exclude.indexOf(name) === -1) return true;
    return false;
  }
}
