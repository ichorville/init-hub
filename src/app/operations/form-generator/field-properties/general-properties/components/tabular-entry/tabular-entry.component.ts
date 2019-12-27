import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-tabular-entry',
  templateUrl: './tabular-entry.component.html',
  styleUrls: ['./tabular-entry.component.css']
})
export class TabularEntryComponent implements OnInit {

  @Input() widget:any;

  currentWidget:any;

  public tabularHeaderName: string;
  public tabularFieldName: string;
  public tabularFieldType: any;
  public tabularHeaderDefinitions = [];

  tabularFieldTypes: any[] = [
    { value: 'textBox', name: 'TextBox' },
    { value: 'number', name: 'Number' },
    { value: 'date', name: 'Date' },
    { value: 'dateTime', name: 'Date And Time' },
    { value: 'time', name: 'Time' }
  ];

  constructor() { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }
  
  tabularFieldTypeChange(value) {
    this.tabularFieldType = value;
  }

  // Add tabular entry header definitions
  addHeaderDefinition() {
    this.currentWidget.headerDefinitions.push({
      headerName: this.tabularHeaderName,
      fieldName: this.tabularFieldName,
      fieldType: this.tabularFieldType.value,
    });
  
    this.reset();
  }

  removeDefinition(index) {
    this.currentWidget.headerDefinitions.splice(index, 1);
  }

  reset(){
    this.tabularHeaderName = undefined;
    this.tabularFieldName = undefined;
    this.tabularFieldType = undefined;
  }
}
