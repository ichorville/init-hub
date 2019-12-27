import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tabular-entry',
  templateUrl: './tabular-entry.component.html',
  styleUrls: ['./tabular-entry.component.css']
})
export class TabularEntryComponent implements OnInit {

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

