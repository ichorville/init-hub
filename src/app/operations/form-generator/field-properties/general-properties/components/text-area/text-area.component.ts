import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit {
  @Input() widget:any;

  currentWidget:any;

  constructor() { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
    console.log(this.currentWidget)
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }
  
  onBindingSelected(event){
    this.currentWidget.apiBinding = event;
  }

  validateInput(event) {
    if (event.keyCode == 69 || event.keyCode == 189 || event.keyCode == 187 || event.keyCode == 190) {
      event.preventDefault();
    }
  }
}
