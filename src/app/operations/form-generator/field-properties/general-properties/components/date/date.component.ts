import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  @Input() widget:any;

  currentWidget:any;

  constructor() { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
  }

  onBindingSelected(event){
    this.currentWidget.apiBinding = event;
  }

  validateInput(event) {
    if (event.keyCode == 69 || event.keyCode == 189 || event.keyCode == 187 || event.keyCode == 190) {
      event.preventDefault();
    }
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }
}
