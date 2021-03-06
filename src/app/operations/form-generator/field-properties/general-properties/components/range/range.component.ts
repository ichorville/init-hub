import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.css']
})
export class RangeComponent implements OnInit {

  @Input() widget:any;

  currentWidget:any;

  constructor() { }

  ngOnInit() {
    this.currentWidget = this.widget.controlContent;
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes["widget"]) this.currentWidget = this.widget.controlContent;;
  }

  validateKey(event) {
    if (event.keyCode == 69 || event.keyCode == 189 || event.keyCode == 187) {
      event.preventDefault();
    }
  }

}
